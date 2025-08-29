"use client";

// React
import { TransitionStartFunction, useTransition } from "react";

// Componentes
import Container from "../container";
import Table from "./table";
import ToolBar from "./toolbar";
import Loading from "./loading";

// Tipagem
import { ItemsColumns } from "@/types/columns";
interface DataGridProps<T> {
  title: string;
  addItemDescription: string;
  handleAddItems: string;
  columns: ItemsColumns[];
  data: T[];
  renderCell: (
    item: T,
    columnUid: string,
    setLoading: TransitionStartFunction
  ) => React.ReactNode;
}

export default function DataGrid<T>({
  title,
  addItemDescription,
  handleAddItems,
  columns,
  data,
  renderCell,
}: DataGridProps<T>) {
  const [loading, setLoading] = useTransition();

  return (
    <Container>
      <ToolBar
        title={title}
        addItemDescription={addItemDescription}
        handleAddItems={handleAddItems}
        setLoading={setLoading}
      />
      {loading ? (
        <Loading />
      ) : (
        <Table
          columns={columns}
          data={data}
          setLoading={setLoading}
          renderCell={renderCell}
        />
      )}
    </Container>
  );
}
