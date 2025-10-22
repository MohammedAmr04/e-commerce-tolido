"use client";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[var(--color-bg)] text-[var(--color-text)]">
      <Spin
        indicator={
          <LoadingOutlined
            className="!text-primary"
            style={{ fontSize: 40 }}
            spin
          />
        }
      />
    </div>
  );
}
