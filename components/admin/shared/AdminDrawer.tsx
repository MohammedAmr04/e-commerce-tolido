"use client";
import { Drawer } from "antd";

type Props = {
  title?: string;
  open?: boolean;
  onClose?: () => void;
  children: React.ReactNode;
  width?: number;
};

export default function AdminDrawer({
  title,
  open,
  onClose,
  children,
  width = 480,
}: Props) {
  return (
    <Drawer
      title={title}
      placement="right"
      width={width}
      open={open}
      onClose={onClose}
      destroyOnClose
    >
      {children}
    </Drawer>
  );
}
