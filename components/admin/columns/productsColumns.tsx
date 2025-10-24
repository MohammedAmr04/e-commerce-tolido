import { ColumnsType } from "antd/es/table";
import { Edit, Trash2, Eye } from "lucide-react";
import { Button, Tag, Tooltip, Image, Space } from "antd";
import { ProductAdmin } from "@/components/services/api/product/useProductMutations";

export const productAdminColumns = (
  handleDrawer?: (action: "OPEN" | "CLOSE", item?: ProductAdmin) => void,
  handleDelete?: (id: string) => void
): ColumnsType<ProductAdmin> => [
  {
    title: "Image",
    dataIndex: "images",
    key: "images",
    render: (images: { url: string }[]) => {
      const url = images?.[0]?.url;
      return url ? (
        <Image
          src={url}
          alt="product"
          width={50}
          height={50}
          className="rounded-md object-cover"
          preview={false}
          fallback="/placeholder.png"
        />
      ) : (
        <div className="w-12 h-12 bg-gray-200 rounded flex items-center justify-center">
          <span className="text-xs text-gray-400">No img</span>
        </div>
      );
    },
  },
  {
    title: "Title",
    dataIndex: ["title", "en"],
    key: "title",
    ellipsis: true,
    render: (title: string) => (
      <Tooltip title={title}>
        <span className="font-medium">{title}</span>
      </Tooltip>
    ),
  },
  {
    title: "Category",
    dataIndex: ["category", "en"],
    key: "category",
    render: (category: string) => category || "—",
  },
  {
    title: "Countries",
    dataIndex: "prices",
    key: "countries",
    render: (prices: ProductAdmin["prices"]) => {
      if (!prices || prices.length === 0) return "—";

      return (
        <div className="flex gap-1">
          {prices.slice(0, 3).map((price, i) => (
            <Tag key={i} color="blue" className="m-0">
              {price.country.code}
            </Tag>
          ))}
          {prices.length > 3 && (
            <Tag color="default" className="m-0">
              +{prices.length - 3}
            </Tag>
          )}
        </div>
      );
    },
  },

  {
    title: "Stock Status",
    key: "stockStatus",
    render: (_, record: ProductAdmin) => {
      if (!record.prices || record.prices.length === 0) return "—";

      const inStockCount = record.prices.filter(
        (p) => p.stock === "stock"
      ).length;
      const totalCount = record.prices.length;

      if (inStockCount === totalCount) {
        return <Tag color="green">All In Stock</Tag>;
      } else if (inStockCount === 0) {
        return <Tag color="red">All Out</Tag>;
      } else {
        return (
          <Tag color="orange">
            {inStockCount}/{totalCount} In Stock
          </Tag>
        );
      }
    },
  },
  {
    title: "Total Sold",
    key: "totalSold",
    align: "center",
    render: (_, record: ProductAdmin) => {
      if (!record.prices || record.prices.length === 0) return "0";

      const totalSold = record.prices.reduce(
        (sum, p) => sum + (p.sold || 0),
        0
      );
      return <span className="font-medium">{totalSold}</span>;
    },
  },
  {
    title: "Total Amount",
    key: "totalAmount",
    align: "center",
    render: (_, record: ProductAdmin) => {
      if (!record.prices || record.prices.length === 0) return "0";

      const totalAmount = record.prices.reduce(
        (sum, p) => sum + (p.amount || 0),
        0
      );
      return <span className="font-medium">{totalAmount}</span>;
    },
  },
  {
    title: "Min Order",
    dataIndex: "minimumOrderQuantity",
    key: "minimumOrderQuantity",
    align: "center",
    render: (qty: number) => qty || "—",
  },
  {
    title: "Created",
    dataIndex: "createdAt",
    key: "createdAt",
    render: (date: string) => {
      if (!date) return "—";
      return new Date(date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    },
  },
  {
    title: "Actions",
    key: "actions",
    fixed: "right",
    width: 120,
    render: (_, record: ProductAdmin) => (
      <Space size="small">
        <Tooltip title="View Details">
          <Button
            type="text"
            size="small"
            icon={<Eye size={16} className="text-gray-500" />}
            onClick={() => {
              // Open details modal or navigate to detail page
              console.log("View details:", record);
            }}
          />
        </Tooltip>
        <Tooltip title="Edit">
          <Button
            type="text"
            size="small"
            icon={<Edit size={16} className="text-blue-500" />}
            onClick={() => handleDrawer?.("OPEN", record)}
          />
        </Tooltip>
        <Tooltip title="Delete">
          <Button
            type="text"
            size="small"
            danger
            icon={<Trash2 size={16} className="text-red-500" />}
            onClick={() => handleDelete?.(record.id)}
          />
        </Tooltip>
      </Space>
    ),
  },
];

// ==========================================
// EXPANDABLE ROW CONTENT (Optional - لعرض تفاصيل الأسعار)
// ==========================================

export const ProductPricesExpanded = ({
  prices,
}: {
  prices: ProductAdmin["prices"];
}) => {
  if (!prices || prices.length === 0) {
    return (
      <div className="p-4 text-[var(--color-text)]/60 text-center">
        No pricing information
      </div>
    );
  }

  return (
    <div className="p-4 bg-[var(--color-background-soft)] rounded-xl">
      <h4 className="font-semibold mb-4 text-[var(--color-text)]">
        Pricing Details by Country
      </h4>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {prices.map((price, index) => (
          <div
            key={index}
            className="p-4 rounded-2xl shadow-sm border border-[var(--color-border)] bg-[var(--color-card)] hover:shadow-md transition-all duration-200"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="font-medium text-[var(--color-text)] text-lg">
                {price.country.code}
              </span>
              <Tag
                color={
                  price.stock === "stock"
                    ? "var(--color-success)"
                    : "var(--color-danger)"
                }
                style={{
                  color: "#fff",
                  borderRadius: "6px",
                  fontWeight: 500,
                }}
              >
                {price.stock === "stock" ? "In Stock" : "Out of Stock"}
              </Tag>
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-[var(--color-text)]/70">Base Price:</span>
                <span className="font-medium text-[var(--color-text)]">
                  {price.basePrice} {price.currency}
                </span>
              </div>
              {price.discount !== undefined && (
                <div className="flex justify-between">
                  <span className="text-[var(--color-text)]/70">Discount:</span>
                  <span
                    className={`font-medium ${
                      price.discount > 0
                        ? "text-[var(--color-danger)]"
                        : "text-[var(--color-text)]/60"
                    }`}
                  >
                    {price.discount}%
                  </span>
                </div>
              )}

              <div className="flex justify-between">
                <span className="text-[var(--color-text)]/70">
                  Final Price:
                </span>
                <span className="font-semibold text-[var(--color-success)]">
                  {price.finalPrice} {price.currency}
                </span>
              </div>

              <div className="pt-2 border-t border-[var(--color-border)] space-y-1">
                <div className="flex justify-between">
                  <span className="text-[var(--color-text)]/70">Sold:</span>
                  <span className="font-medium text-[var(--color-text)]">
                    {price.sold || 0}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--color-text)]/70">
                    Available:
                  </span>
                  <span className="font-medium text-[var(--color-text)]">
                    {price.amount || 0}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
