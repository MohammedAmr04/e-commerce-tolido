"use client";
import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";

export default function SearchBar() {
  return (
    <div className="flex justify-center items-center w-full max-w-md mx-auto">
      <Input
        placeholder="Search for products"
        prefix={<SearchOutlined className="!text-gray-400" />}
        className="!rounded-full border-gray-200 !px-6 focus:border-gray-400 focus:shadow-md transition-all duration-200"
      />
    </div>
  );
}
