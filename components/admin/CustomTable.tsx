import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";

type Props<T extends { id: React.Key }> = {
  dataSource: T[];
  columns: ColumnsType<T>;
};

export default function CustomTable<T extends { id: React.Key }>({
  dataSource,
  columns,
}: Props<T>) {
  return (
    <div className="bg-background-dark py-4 rounded-lg">
      <Table<T>
        rowKey="id"
        columns={columns}
        dataSource={dataSource}
        scroll={{ x: true }}
        pagination={{ position: ["bottomCenter"], pageSize: 8 }}
        className="table-organization !bg-transparent"
        rowClassName={(_, index) => (index % 2 === 0 ? "even-row" : "odd-row")}
      />
    </div>
  );
}
