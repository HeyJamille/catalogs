"use client";

// React
import { TransitionStartFunction } from "react";

// Bibliotecas
import {
  Table as TB,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/react";

// Tipagem
import { ItemsColumns } from "@/types/columns";
interface TableProps<T> {
  columns: ItemsColumns[];
  data: T[];
  setLoading: TransitionStartFunction;
  renderCell: (
    item: T,
    columnUid: string,
    setLoading: TransitionStartFunction
  ) => React.ReactNode;
}

export default function Table<T>({
  columns,
  data,
  setLoading,
  renderCell,
}: TableProps<T>) {
  return (
    <TB
      aria-label="table"
      isHeaderSticky
      selectionMode="multiple"
      classNames={{
        base: "p-4 mb-5 overflow-auto max-h-[530px]",
        th: "bg-[#3b82f6] text-gray-200 text-sm ",
        wrapper: "",
        td: "border-b border-gray-300",
      }}
      topContentPlacement="outside"
      removeWrapper
    >
      <TableHeader>
        {columns?.map((clm) => (
          <TableColumn align="center" key={clm.uid}>
            {clm.name}
          </TableColumn>
        ))}
      </TableHeader>

      <TableBody
        items={data ? data : []}
        className="w-full "
        emptyContent={"Nenhum dado encontrado :("}
      >
        {(item) => (
          <TableRow key={(item as any).id}>
            {columns?.map((col) => (
              <TableCell key={col.uid}>
                {renderCell(item, col.uid, setLoading)}
              </TableCell>
            ))}
          </TableRow>
        )}
      </TableBody>
    </TB>
  );
}
