"use client";

// React
import { TransitionStartFunction, useState } from "react";

// Bibliotecas
import {
  Spinner,
  Table as TB,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/react";
import { InfiniteScroll } from "./infiniteScroll";
import Cookies from "js-cookie";

// Tipagem
import { ItemsColumns } from "@/types/columns";
import { setupApiClient } from "@/utils/api/fetchData";
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
  pagination,
  setLoading,
  renderCell,
}: TableProps<T>) {
  const [listData, setListData] = useState<T[]>(data);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);

  const api = setupApiClient(Cookies.get("auth_token"));

  const visibleColumns = columns.filter((col) =>
    selectedColumns.includes(col.uid)
  );

  const fetchMore = async () => {
    if (listData.length !== pagination.totalItems) {
      setCurrentPage(currentPage + 1);
      setHasMore(true);

      const resp = await api.get(
        `${pagination.endpoint}/filters?limit=10&page=${currentPage + 1}`
      );

      setListData((prev) => [...prev, ...resp.data.products]);
      setHasMore(false);
    }
  };

  return (
    <main
      id="scrollArea"
      className="overflow-auto xl:max-h-[440px] 2xl:max-h-[510px] py-2 px-4 mb-8"
    >
      <TB
        aria-label="table"
        isHeaderSticky
        selectionMode="multiple"
        classNames={{
          th: "bg-[#3b82f6] text-gray-200 text-sm ",
          td: "border-b border-gray-300",
        }}
        topContentPlacement="outside"
        bottomContent={
          hasMore ? (
            <div className="flex w-full justify-center">
              <Spinner color="primary" />
            </div>
          ) : null
        }
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
          items={listData ? listData : []}
          className="w-full "
          emptyContent="Nenhum dado encontrado :("
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
      {!hasMore && <InfiniteScroll fetchMore={fetchMore} />}
    </main>
  );
}
