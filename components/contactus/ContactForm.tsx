"use client";

import {  Form, Input, Button, message, Card } from "antd";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";

const { TextArea } = Input;

export default function ContactForm() {
  const t = useTranslations("contact");
  const { locale } = useParams();
  const isArabic = locale === "ar";
  const [messageApi, contextHolder] = message.useMessage();

  const [form] = Form.useForm();

  const handleSubmit = (values: string) => {
    console.log("Form Submitted:", values);
    messageApi.success(t("form.success"));
    form.resetFields();
  };

  return (
    <div
      className={`max-w-2xl mx-auto ${
        isArabic ? "text-right" : "text-left"
      } px-4`}
    >
{contextHolder}
      <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-primary)] mb-6 text-center">
        {t("form.title")}
      </h2>
      <p className="text-center font-medium text-[var(--color-text)] opacity-80 mb-10">
        {t("form.subtitle")}
      </p>

      <Card className="!bg-[var(--color-card)] shadow-md border border-[var(--color-border)] rounded-2xl">
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          dir={isArabic ? "rtl" : "ltr"}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {/* Name */}
          <Form.Item
            label={t("form.name")}
            name="name"
            rules={[{ required: true, message: t("form.required") }]}
          >
            <Input size="large" placeholder={t("form.namePlaceholder")} />
          </Form.Item>

          {/* Email */}
          <Form.Item
            label={t("form.email")}
            name="email"
            rules={[
              { required: true, message: t("form.required") },
              { type: "email", message: t("form.invalidEmail") },
            ]}
          >
            <Input size="large" placeholder={t("form.emailPlaceholder")} />
          </Form.Item>

          {/* Subject */}
          <Form.Item
            label={t("form.subject")}
            name="subject"
            className="md:col-span-2"
            rules={[{ required: true, message: t("form.required") }]}
          >
            <Input size="large" placeholder={t("form.subjectPlaceholder")} />
          </Form.Item>

          {/* Message */}
          <Form.Item
            label={t("form.message")}
            name="message"
            className="md:col-span-2"
            rules={[{ required: true, message: t("form.required") }]}
          >
            <TextArea
              rows={5}
              size="large"
              placeholder={t("form.messagePlaceholder")}
            />
          </Form.Item>

          {/* زر الإرسال */}
          <div className="md:col-span-2 text-center pt-4">
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              className="!bg-[var(--color-primary)] hover:!bg-[var(--color-accent)] !border-none px-10 py-3 rounded-lg text-white font-semibold transition-all hover:scale-105"
            >
              {t("form.send")}
            </Button>
          </div>
        </Form>
      </Card>
    </div>
  );
}
