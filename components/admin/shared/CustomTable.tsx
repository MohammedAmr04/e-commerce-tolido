import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import "./table.css";
import { TableProps } from "antd/lib";

type CustomTableProps<T extends { id: React.Key }> = TableProps<T> & {
  dataSource: T[] | undefined;
  columns: ColumnsType<T>;
};

export default function CustomTable<T extends { id: React.Key }>({
  dataSource,
  columns,
  ...rest
}: CustomTableProps<T>) {
  return (
    <div className="bg-background-dark py-4 rounded-lg">
      <Table<T>
        rowKey="id"
        columns={columns}
        dataSource={dataSource}
        scroll={{ x: true }}
        pagination={{ position: ["bottomCenter"], pageSize: 8 }}
        className="table !bg-transparent"
        rowClassName={(_, index) => (index % 2 === 0 ? "even-row" : "odd-row")}
        {...rest}
      />
    </div>
  );
}
