"use client";

// React
import { TransitionStartFunction, useMemo, useState } from "react";

// Bibliotecas
import {
  SortDescriptor,
  Spinner,
  Table as TB,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/react";
import Cookies from "js-cookie";
import { ChevronUp } from "lucide-react";

// Utils
import { InfiniteScroll } from "./infiniteScroll";
import { filterParams } from "@/utils/filters/filterParams";
import { setupApiClient } from "@/utils/api/fetchData";

// Tipagem
import { ItemsColumns } from "@/types/columns";
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
  const [hoveredColumn, setHoveredColumn] = useState<string | null>(null);
  const [sortDescriptor, setSortDescriptor] = useState<
    SortDescriptor | undefined
  >(undefined);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);

  const api = setupApiClient(Cookies.get("auth_token"));
  const visibleColumns = columns.filter((col) =>
    selectedColumns.includes(col.uid)
  );
  const { query } = filterParams();

  const fetchMore = async () => {
    if (listData.length !== pagination.totalItems) {
      setCurrentPage(currentPage + 1);
      setHasMore(true);

      const resp = await api.get(
        `${pagination.endpoint}/filters?${query}&limit=10&page=${currentPage + 1}`
      );

      setListData((prev) => [...prev, ...resp.data.products]);
      setHasMore(false);
    }
  };

  const sortedData = useMemo(() => {
    if (!sortDescriptor) return listData;

    return [...listData].sort((a: any, b: any) => {
      const first = a[sortDescriptor.column];
      const second = b[sortDescriptor.column];

      if (first === second) return 0;

      if (sortDescriptor.direction === "ascending") {
        return first > second ? 1 : -1;
      } else {
        return first < second ? 1 : -1;
      }
    });
  }, [listData, sortDescriptor]);

  return (
    <main
      id="scrollArea"
      className="overflow-auto xl:max-h-[440px] 2xl:max-h-[510px] py-2 px-4 mb-8"
    >
      <TB
        aria-label="table"
        isHeaderSticky
        classNames={{
          th: "bg-[#3b82f6] text-gray-200 text-sm ",
          td: "border-b border-gray-300",
          tr: "hover:bg-gray-100",
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
            <TableColumn
              align="center"
              key={clm.uid}
              onMouseEnter={() => setHoveredColumn(clm.uid)}
              onMouseLeave={() => setHoveredColumn(null)}
            >
              <div className="w-full space-x-2 flex justify-center items-center">
                <p>{clm.name}</p>
                {hoveredColumn === clm.uid && <ChevronUp className="w-4 h-4" />}
              </div>
            </TableColumn>
          ))}
        </TableHeader>

        <TableBody
          items={sortedData ? sortedData : []}
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
