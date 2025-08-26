"use client";

// Bibliotecas
import {
  Table as TB,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/react";
import ToolBar from "./toolbar";

// React
import { ReactNode, useEffect, useState } from "react";

// Tipagem
type Itemscolumns = {
  name: string;
  uid: string;
};

interface TableProps<T> {
  columns: Itemscolumns[];
  data: T[];
  loading: boolean;
  renderCell: (item: T, columnUid: string) => React.ReactNode;
}

export default function Table<T>({
  columns,
  data,
  loading,
  renderCell,
}: TableProps<T>) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <TB
      aria-label="table"
      isHeaderSticky
      selectionMode="multiple"
      //   bottomContent={bottomContent}
      classNames={{
        base: "p-4 mb-5 overflow-auto max-h-[582px] ",
        th: "bg-[#3b82f6] text-gray-200 text-sm ",
        wrapper: "",
        td: "border-b border-gray-300",
      }}
      //   selectedKeys={selectedKeys}
      //   selectionMode="multiple"
      topContentPlacement="outside"
      removeWrapper
    >
      <TableHeader>
        {columns.map((clm) => (
          <TableColumn align="center" key={clm.uid}>
            {clm.name}
          </TableColumn>
        ))}
      </TableHeader>

      <TableBody
        items={data}
        className="w-full overflow-auto"
        emptyContent={loading ? "Carregando..." : "Nenhum produto encontrado"}
      >
        {(item) => (
          <TableRow key={(item as any).id ?? (item as any).product_code}>
            {columns.map((col) => (
              <TableCell key={col.uid}>{renderCell(item, col.uid)}</TableCell>
            ))}
          </TableRow>
        )}
      </TableBody>
    </TB>
  );
}
