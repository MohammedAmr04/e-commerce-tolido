import { Modal } from "antd";

type Props = {
  title: string;
  open: boolean;
  onCancel: () => void;
  children: React.ReactNode;
};

export default function AdminModal({ title, open, onCancel, children }: Props) {
  return (
    <Modal title={title} open={open} onCancel={onCancel} footer={null}>
      {children}
    </Modal>
  );
}
