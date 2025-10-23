"use client";

import { useEffect, useState } from "react";
import {
  Button,
  Form,
  Input,
  InputNumber,
  Select,
  Space,
  Upload,
  message,
  Card,
  Divider,
} from "antd";
import { PlusOutlined, MinusCircleOutlined } from "@ant-design/icons";
import { useTranslations } from "next-intl";
import type { UploadFile } from "antd/es/upload/interface";
import { UploadProps } from "antd/lib";
import {
  ProductAdmin,
  StockStatus,
  useCreateProduct,
  useUpdateProduct,
} from "@/components/services/api/product/useProductMutations";
import {
  uploadToCloudinary,
  CloudinaryResponse,
} from "@/lib/uploadToCloudinary";
import { countries } from "@/components/services/types/countries";

// ==========================================
// TYPES
// ==========================================
type CustomRequestOptions = Parameters<
  NonNullable<UploadProps["customRequest"]>
>[0];

interface PriceFormEntry {
  country: string;
  basePrice: number;
  discount?: number;
  finalPrice?: number;
  amount?: number;
  stock?: StockStatus;
  currency: string;
}

interface ProductFormValues {
  title_en: string;
  title_ar: string;
  description_en?: string;
  description_ar?: string;
  category_en?: string;
  category_ar?: string;
  prices: PriceFormEntry[];
  minimumOrderQuantity?: number;
}

interface ProductFormProps {
  product?: ProductAdmin | null;
  onClose: () => void;
}

// ==========================================
// COMPONENT
// ==========================================
export default function ProductForm({ product, onClose }: ProductFormProps) {
  const t = useTranslations("Admin.Products");
  const [form] = Form.useForm<ProductFormValues>();
  const createMutation = useCreateProduct();
  const updateMutation = useUpdateProduct();
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [uploading, setUploading] = useState(false);

  const isEdit = !!product;

  // ==========================================
  // HELPERS
  // ==========================================

  // ==========================================
  // LOAD EXISTING PRODUCT DATA
  // ==========================================
  useEffect(() => {
    if (!isEdit || !product) return;

    // Transform ProductAdmin.prices → PriceFormEntry[]
    const prices: PriceFormEntry[] = product.prices.map((price) => ({
      country: price.country.code,
      basePrice: price.basePrice,
      discount: price.discount || undefined,
      finalPrice: price.finalPrice,
      amount: price.amount,
      stock: price.stock,
      currency: price.currency,
    }));

    form.setFieldsValue({
      title_en: product.title.en,
      title_ar: product.title.ar,
      description_en: product.description?.en,
      description_ar: product.description?.ar,
      category_en: product.category?.en,
      category_ar: product.category?.ar,
      prices,
      minimumOrderQuantity: product.minimumOrderQuantity,
    });

    // Load existing images
    if (product.images?.length) {
      setFileList(
        product.images.map((img, i) => ({
          uid: `${product.id}-${i}`,
          name: `image-${i}`,
          status: "done" as const,
          url: img.url,
          thumbUrl: img.url,
        }))
      );
    }
  }, [isEdit, product, form]);

  // ==========================================
  // IMAGE UPLOAD
  // ==========================================
  const handleUpload = async (options: CustomRequestOptions): Promise<void> => {
    const { file, onSuccess, onError } = options;

    try {
      setUploading(true);
      const res: CloudinaryResponse = await uploadToCloudinary(file as File);

      // ✅ Use secure_url instead of url
      const newFile: UploadFile = {
        uid: `${Date.now()}-${Math.random().toString(36)}`,
        name: (file as File).name,
        status: "done",
        url: res.secure_url,
        thumbUrl: res.secure_url,
      };

      setFileList((prev) => [...prev, newFile]);
      onSuccess?.(res);
      message.success(t("uploadSuccess"));
    } catch (err) {
      console.error("Upload error:", err);
      const errorMessage = err instanceof Error ? err.message : "Upload failed";
      onError?.(err as Error);
      message.error(`${t("uploadError")}: ${errorMessage}`);
    } finally {
      setUploading(false);
    }
  };

  const beforeUpload = (file: File): boolean => {
    const isImage = file.type.startsWith("image/");
    if (!isImage) {
      message.error(t("onlyImages"));
      return false;
    }

    const isLt5M = file.size / 1024 / 1024 < 5;
    if (!isLt5M) {
      message.error(t("imageTooLarge"));
      return false;
    }

    return true;
  };

  // ==========================================
  // AUTO-CALCULATE FINAL PRICE
  // ==========================================
  const calculateFinalPrice = (index: number): void => {
    const prices = form.getFieldValue("prices") as PriceFormEntry[];
    const priceEntry = prices[index];

    if (!priceEntry) return;

    const { basePrice, discount } = priceEntry;
    let finalPrice = basePrice;

    if (basePrice && discount && discount > 0) {
      finalPrice = basePrice - (basePrice * discount) / 100;
      finalPrice = Math.round(finalPrice * 100) / 100;
    }

    const newPrices = [...prices];
    newPrices[index].finalPrice = finalPrice;
    form.setFieldsValue({ prices: newPrices });
  };

  // ==========================================
  // FORM SUBMIT
  // ==========================================
  const handleFinish = (values: ProductFormValues): void => {
    // Validate images
    if (fileList.length === 0) {
      message.error(t("pleaseUploadImages"));
      return;
    }

    const validImages = fileList
      .filter((file) => file.url && file.status === "done")
      .map((file) => {
        // Fallback chain
        const urlString =
          typeof file.url === "string"
            ? file.url // From our handleUpload
            : file.response?.secure_url || // Fallback to response
              "";

        return { url: urlString }; // ✅ { url: "https://..." }
      });
    if (validImages.length === 0) {
      message.error(t("noValidImages"));
      return;
    }

    // Validate unique countries
    const countryCodes = values.prices.map((p) => p.country);
    const uniqueCountries = new Set(countryCodes);
    if (uniqueCountries.size !== countryCodes.length) {
      message.error(t("duplicateCountries"));
      return;
    }

    // Prepare payload
    const payload = {
      title: {
        en: values.title_en.trim(),
        ar: values.title_ar.trim(),
      },
      description: {
        en: values.description_en?.trim() || "",
        ar: values.description_ar?.trim() || "",
      },
      category: {
        en: values.category_en?.trim() || "",
        ar: values.category_ar?.trim() || "",
      },
      images: validImages,
      prices: values.prices.map((price) => ({
        basePrice: price.basePrice,
        finalPrice: price.finalPrice || price.basePrice,
        discount: price.discount || 0,
        amount: price.amount || 0,
        currency: price.currency,
        stock: price.stock,
        country: { code: price.country },
      })),
      minimumOrderQuantity: values.minimumOrderQuantity || 1,
    };

    // Submit
    if (isEdit && product) {
      updateMutation.mutate(
        { id: product.id, updates: payload },
        {
          onSuccess: () => {
            message.success(t("updateSuccess"));
            form.resetFields();
            setFileList([]);
            onClose();
          },
          onError: () => {
            message.error(t("updateError"));
          },
        }
      );
    } else {
      createMutation.mutate(payload, {
        onSuccess: () => {
          message.success(t("createSuccess"));
          form.resetFields();
          setFileList([]);
          onClose();
        },
        onError: () => {
          message.error(t("createError"));
        },
      });
    }
  };

  const isLoading =
    createMutation.isPending || updateMutation.isPending || uploading;

  // ==========================================
  // RENDER
  // ==========================================
  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleFinish}
      className="p-4"
      initialValues={{
        prices: [
          {
            country: "",
            basePrice: 0,
            amount: 0,
            stock: "stock" as StockStatus,
            currency: "USD",
          },
        ],
      }}
    >
      {/* BASIC INFO */}
      <div className="grid md:grid-cols-2 gap-4">
        <Form.Item
          label={t("titleEn")}
          name="title_en"
          rules={[
            { required: true, message: t("required") },
            { min: 3, message: t("minLength", { count: 3 }) },
            { max: 100, message: t("maxLength", { count: 100 }) },
          ]}
        >
          <Input placeholder={t("enterTitleEn")} />
        </Form.Item>

        <Form.Item
          label={t("titleAr")}
          name="title_ar"
          rules={[
            { required: true, message: t("required") },
            { min: 3, message: t("minLength", { count: 3 }) },
            { max: 100, message: t("maxLength", { count: 100 }) },
          ]}
        >
          <Input placeholder={t("enterTitleAr")} />
        </Form.Item>

        <Form.Item label={t("descriptionEn")} name="description_en">
          <Input.TextArea
            rows={3}
            placeholder={t("enterDescriptionEn")}
            maxLength={500}
            showCount
          />
        </Form.Item>

        <Form.Item label={t("descriptionAr")} name="description_ar">
          <Input.TextArea
            rows={3}
            placeholder={t("enterDescriptionAr")}
            maxLength={500}
            showCount
          />
        </Form.Item>
        <Form.Item label={t("categoryEn")} name="category_en">
          <Input placeholder={t("enterDescriptionEn")} />
        </Form.Item>

        <Form.Item label={t("categoryAr")} name="category_ar">
          <Input placeholder={t("enterDescriptionAr")} />
        </Form.Item>
        <Form.Item
          label={t("minOrder")}
          name="minimumOrderQuantity"
          rules={[{ type: "number", min: 1, message: t("invalidQuantity") }]}
        >
          <InputNumber min={1} className="w-full" placeholder="1" />
        </Form.Item>

        {/* IMAGES */}
        <Form.Item label={t("images")} required className="md:col-span-2">
          <Upload
            customRequest={handleUpload}
            listType="picture-card"
            fileList={fileList}
            onRemove={(file) =>
              setFileList((prev) => prev.filter((f) => f.uid !== file.uid))
            }
            accept="image/*"
            multiple
            maxCount={5}
            beforeUpload={beforeUpload}
            showUploadList={{ showRemoveIcon: true, showPreviewIcon: true }}
            disabled={uploading}
          >
            {fileList.length >= 5 ? null : (
              <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>
                  {uploading ? t("uploading") : t("upload")}
                </div>
              </div>
            )}
          </Upload>
          <p className="text-gray-500 text-sm mt-2">
            {t("maxImages", { count: 5 })} • {t("maxSize", { size: "5MB" })}
          </p>
        </Form.Item>
      </div>

      {/* PRICING SECTION */}
      <Divider orientation="left" className="mt-6">
        {t("countryPricing")} 💰
      </Divider>

      <Form.List
        name="prices"
        rules={[
          {
            validator: async (_, prices: PriceFormEntry[]) => {
              if (!prices || prices.length < 1) {
                return Promise.reject(new Error(t("atLeastOnePrice")));
              }
            },
          },
        ]}
      >
        {(fields, { add, remove }, { errors }) => (
          <>
            {fields.map((field, index) => (
              <Card
                key={field.key}
                size="small"
                className="mb-4"
                title={`${t("country")} #${index + 1}`}
                extra={
                  fields.length > 1 && (
                    <Button
                      type="text"
                      danger
                      icon={<MinusCircleOutlined />}
                      onClick={() => remove(field.name)}
                    >
                      {t("remove")}
                    </Button>
                  )
                }
              >
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <Form.Item
                    {...field}
                    label={t("country")}
                    name={[field.name, "country"]}
                    rules={[{ required: true, message: t("required") }]}
                  >
                    <Select
                      showSearch
                      placeholder={t("selectCountry")}
                      options={[
                        { label: "Egypt 🇪🇬", value: countries.Egypt },
                        { label: "Syria 🇸🇾", value: countries.Syria },
                        { label: "Jordan 🇯🇴", value: countries.Jordan },
                        { label: t("other"), value: "Other" },
                      ]}
                    />
                  </Form.Item>

                  <Form.Item
                    {...field}
                    label={t("basePrice")}
                    name={[field.name, "basePrice"]}
                    rules={[
                      { required: true, message: t("required") },
                      { type: "number", min: 0.01, message: t("minPrice") },
                    ]}
                  >
                    <InputNumber
                      min={0}
                      precision={2}
                      className="w-full"
                      addonAfter="USD"
                      onChange={() => calculateFinalPrice(index)}
                    />
                  </Form.Item>

                  <Form.Item
                    {...field}
                    label={t("discount")}
                    name={[field.name, "discount"]}
                  >
                    <InputNumber
                      min={0}
                      max={100}
                      precision={0}
                      className="w-full"
                      addonAfter="%"
                      onChange={() => calculateFinalPrice(index)}
                    />
                  </Form.Item>

                  <Form.Item
                    {...field}
                    label={t("finalPrice")}
                    name={[field.name, "finalPrice"]}
                  >
                    <InputNumber
                      min={0}
                      precision={2}
                      className="w-full"
                      addonAfter="USD"
                      disabled
                    />
                  </Form.Item>

                  <Form.Item
                    {...field}
                    label={t("stock")}
                    name={[field.name, "stock"]}
                    initialValue="stock"
                  >
                    <Select
                      options={[
                        { label: t("inStock"), value: "stock" },
                        { label: t("outOfStock"), value: "unStock" },
                      ]}
                    />
                  </Form.Item>

                  <Form.Item
                    {...field}
                    label={t("currency")}
                    name={[field.name, "currency"]}
                    initialValue="USD"
                  >
                    <Select
                      options={[
                        { label: "USD 💵", value: "USD" },
                        { label: "EUR 💶", value: "EUR" },
                        { label: "EGP 🇪🇬", value: "EGP" },
                      ]}
                    />
                  </Form.Item>
                </div>
              </Card>
            ))}

            <Form.Item>
              <Button
                type="dashed"
                onClick={() =>
                  add({
                    country: "",
                    basePrice: 0,
                    amount: 0,
                    stock: "stock" as StockStatus,
                    currency: "USD",
                  })
                }
                block
                icon={<PlusOutlined />}
                disabled={fields.length >= 10}
              >
                {t("addCountry")}
              </Button>
              {fields.length >= 10 && (
                <p className="text-orange-500 text-sm mt-2">
                  {t("maxCountries", { count: 10 })}
                </p>
              )}
              <Form.ErrorList errors={errors} />
            </Form.Item>
          </>
        )}
      </Form.List>

      {/* ACTIONS */}
      <Space className="mt-6 flex justify-end w-full">
        <Button onClick={onClose} disabled={isLoading}>
          {t("cancel")}
        </Button>
        <Button type="primary" htmlType="submit" loading={isLoading}>
          {isEdit ? t("update") : t("create")}
        </Button>
      </Space>
    </Form>
  );
}
