"use client";

import { Drawer, Form, Input, Button } from "antd";
import { useTranslations } from "next-intl";

interface ShippingDrawerProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (values: string) => void;
}

export default function ShippingDrawer({ open, onClose, onSubmit }: ShippingDrawerProps) {
  const [form] = Form.useForm();
  const t = useTranslations("cart.form");

  const handleFinish = (values: string) => {
    onSubmit(values);
    onClose();
  };

  return (
    <Drawer
      title={t("title")}
      placement="right"
      onClose={onClose}
      open={open}
      width={550}
    >
      <Form form={form} layout="vertical" onFinish={handleFinish}>
        <Form.Item
          label={t("fullName")}
          name="fullName"
          rules={[{ required: true }]}
        >
          <Input size="large" />
        </Form.Item>

        <Form.Item
          label={t("phone")}
          name="phone"
          rules={[{ required: true }]}
        >
          <Input size="large" />
        </Form.Item>

        <Form.Item
          label={t("city")}
          name="city"
          rules={[{ required: true }]}
        >
          <Input size="large" />
        </Form.Item>

        <Form.Item
          label={t("street")}
          name="street"
          rules={[{ required: true }]}
        >
          <Input size="large" />
        </Form.Item>

        <Form.Item label={t("comment")} name="comment">
          <Input.TextArea rows={3} size="large" />
        </Form.Item>

        <Button type="primary" htmlType="submit" block size="large">
          {t("save")}
        </Button>
      </Form>
    </Drawer>
  );
}
