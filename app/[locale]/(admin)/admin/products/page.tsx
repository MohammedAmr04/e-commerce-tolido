"use client";

import { useState } from "react";
import { message, Modal, Input, Select, Button } from "antd";
import {
  PlusOutlined,
  SearchOutlined,
  FilterOutlined,
} from "@ant-design/icons";
import {
  productAdminColumns,
  ProductPricesExpanded,
} from "@/components/admin/columns/productsColumns";
import { useAdminTable } from "@/components/admin/hooks/useAdminTable";
import TableLayout from "@/components/admin/layouts/TableLayout";
import ProductForm from "@/components/admin/pages/products/ProductForm";
import AdminDrawer from "@/components/admin/shared/AdminDrawer";
import {
  ProductAdmin,
  useDeleteProduct,
  useProductsAdmin,
} from "@/components/services/api/product/useProductMutations";
import CustomTable from "@/components/admin/shared/CustomTable";

export default function AdminProductsPage() {
  const [queryParams, setQueryParams] = useState({
    page: 1,
    limit: 10,
    search: "",
    category: null as string | null,
  });

  // ✅ Fetch products with all prices
  const { data, isLoading, error } = useProductsAdmin(queryParams);
  const { handleDrawer, isDrawerOpen, selectedItem } =
    useAdminTable<ProductAdmin>();
  const deleteMutation = useDeleteProduct();

  // Delete confirmation
  const handleDelete = (id: string) => {
    Modal.confirm({
      title: "Delete Product",
      content:
        "Are you sure you want to delete this product? This action cannot be undone.",
      okText: "Delete",
      okType: "danger",
      zIndex: 2000, // ← جرب تزود دي

      cancelText: "Cancel",
      onOk: () => {
        deleteMutation.mutate(id, {
          onSuccess: () => {
            message.success("Product deleted successfully");
          },
          onError: (error) => {
            message.error(
              error?.response?.data?.message || "Failed to delete product"
            );
          },
        });
      },
    });
  };

  // Search handler
  const handleSearch = (value: string) => {
    setQueryParams((prev) => ({ ...prev, search: value, page: 1 }));
  };

  // Category filter handler
  const handleCategoryChange = (value: string | null) => {
    setQueryParams((prev) => ({ ...prev, category: value, page: 1 }));
  };

  if (error) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <p className="text-red-600 text-lg">Error loading products</p>
          <p className="text-gray-500 mt-2">{error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <TableLayout
      title="Products Management"
      button={
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => handleDrawer("OPEN")}
          size="large"
        >
          Add Product
        </Button>
      }
    >
      {/* Filters */}
      <div className="mb-4 flex flex-wrap gap-4">
        <Input
          placeholder="Search products..."
          prefix={<SearchOutlined />}
          value={queryParams.search}
          onChange={(e) => handleSearch(e.target.value)}
          style={{ width: 300 }}
          allowClear
        />

        <Select
          placeholder="Filter by category"
          value={queryParams.category}
          onChange={handleCategoryChange}
          style={{ width: 200 }}
          allowClear
          suffixIcon={<FilterOutlined />}
          options={[
            { label: "All Categories", value: null },
            { label: "Electronics", value: "Electronics" },
            { label: "Clothing", value: "Clothing" },
            { label: "Food", value: "Food" },
            // Add more categories as needed
          ]}
        />

        <div className="ml-auto text-gray-600">
          Total: <span className="font-semibold">{data?.total || 0}</span>{" "}
          products
        </div>
      </div>

      {/* Table with Expandable Rows */}
      <CustomTable<ProductAdmin>
        dataSource={data?.products || []}
        columns={productAdminColumns(handleDrawer, handleDelete)}
        loading={isLoading || deleteMutation.isPending}
        pagination={{
          current: data?.page || 1,
          total: data?.total || 0,
          pageSize: queryParams.limit,
          showSizeChanger: true,
          showTotal: (total, range) =>
            `${range[0]}-${range[1]} of ${total} items`,
          onChange: (page, pageSize) =>
            setQueryParams((prev) => ({
              ...prev,
              page,
              limit: pageSize || 10,
            })),
        }}
        // ✅ Expandable row to show pricing details
        expandable={{
          expandedRowRender: (record) => (
            <ProductPricesExpanded prices={record.prices} />
          ),
          rowExpandable: (record) => record.prices && record.prices.length > 0,
        }}
      />

      {/* Drawer for Create/Edit */}
      <AdminDrawer
        open={isDrawerOpen}
        onClose={() => handleDrawer("CLOSE")}
        title={selectedItem ? "Edit Product" : "Create Product"}
        width={800}
      >
        <ProductForm
          product={selectedItem}
          onClose={() => handleDrawer("CLOSE")}
        />
      </AdminDrawer>
    </TableLayout>
  );
}
