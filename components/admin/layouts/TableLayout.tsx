import { Button } from "antd";

type Props = {
  title: string;
  showAdd?: boolean;
  onAddClick?: () => void;
  children: React.ReactNode;
};

export default function TableLayout({
  title,
  showAdd,
  onAddClick,
  children,
}: Props) {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">{title}</h2>
        {showAdd && (
          <Button type="primary" onClick={onAddClick}>
            Add New
          </Button>
        )}
      </div>
      {children}
    </div>
  );
}
