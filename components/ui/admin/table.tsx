"use client";

// React
import { TransitionStartFunction, useState } from "react";

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
import { useInfiniteScroll } from "@heroui/use-infinite-scroll";
import { useRouter, useSearchParams } from "next/navigation";
import { useAsyncList } from "@react-stately/data";
import { InfiniteScroll } from "./infiniteScroll";
import { Paginations } from "@/types/pagination";
interface TableProps<T> {
  columns: ItemsColumns[];
  data: T[];
  selectedColumns: string[];
  pagination: Paginations;
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
  selectedColumns,
  renderCell,
  setLoading,
}: TableProps<T>) {
  const [hasMore, setHasMore] = useState(false);

  let page: number = 1;
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());
  const visibleColumns = columns.filter((col) =>
    selectedColumns.includes(col.uid)
  );

  async function onLoadMore() {
    if (!hasMore) return;

    params.append("page", "2");

    router.refresh();
  }

  return (
    <main>
      <TB
        aria-label="table"
        isHeaderSticky
        selectionMode="multiple"
        // baseRef={<InfiniteScroll fetchMore={onLoadMore}/>}
        classNames={{
          base: "p-4 mb-5 overflow-auto xl:max-h-[440px] 2xl:max-h-[530px]",
          th: "bg-[#3b82f6] text-gray-200 text-sm ",
          wrapper: "",
          td: "border-b border-gray-300",
        }}
        topContentPlacement="outside"
        removeWrapper
      >
        <TableHeader>
          {visibleColumns.map((clm) => (
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
              {visibleColumns.map((col) => (
                <TableCell key={col.uid}>
                  {renderCell(item, col.uid, setLoading)}
                </TableCell>
              ))}
            </TableRow>
          )}
        </TableBody>
      </TB>
    </main>
  );
}
