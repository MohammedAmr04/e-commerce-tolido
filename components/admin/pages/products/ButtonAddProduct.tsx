"use client";
import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useTranslations } from "next-intl";

interface ButtonAddProductProps {
  onClick?: () => void;
}

export default function ButtonAddProduct({ onClick }: ButtonAddProductProps) {
  const t = useTranslations("Admin.Products");

  return (
    <div className="flex justify-end ">
      <Button
        type="primary"
        size="large"
        icon={<PlusOutlined />}
        onClick={() => onClick?.()}
        className=" text-white !font-medium px-6 py-2 rounded-xl shadow-md transition-all duration-200"
      >
        {t("newProduct")}
      </Button>
    </div>
  );
}
