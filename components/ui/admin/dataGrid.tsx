"use client";

// React
import { TransitionStartFunction, useState, useTransition } from "react";

// Next
import { useRouter, useSearchParams } from "next/navigation";

// Bibliotecas
import { SharedSelection, useDisclosure } from "@heroui/react";
<<<<<<< HEAD
import { useInfiniteScroll } from "@heroui/use-infinite-scroll";
import { useAsyncList } from "@react-stately/data";
=======
>>>>>>> fe63c346deb74a93a9db259491377efc41fc0342

// Componentes
import Container from "../container";
import Table from "./table";
import ToolBar from "./toolbar";
import Loading from "./loading";
import Drawer from "./drawers/drawer";
import DrawerFilter from "./drawers/drawerFilter";
import DrawerRelatory from "./drawers/drawerRelatory";

// Utils
import handleDownloadExcel from "@/utils/relatorys/excel/handleDownloadExcel";

// Tipagem
import { ItemsColumns } from "@/types/columns";
import { FilterItem, StateValue } from "@/types/filter";
import { Paginations } from "@/types/pagination";

interface DataGridProps<T> {
  title: string;
  addItemDescription: string;
  handleAddItems: string;
  columns: ItemsColumns[];
  data: T[];
  dataFilter: FilterItem[];
  relatoryData: { id: string; label: string; disable: boolean }[];
  activateReportingOption?: Boolean;
  pagination: Paginations;
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
  dataFilter,
  relatoryData,
  activateReportingOption = false,
  pagination,
  renderCell,
}: DataGridProps<T>) {
  const searchParams = useSearchParams();

  const [name, setname] = useState("");
  const [extension, setExtension] = useState<string[]>(["excel"]);
  const [value, setValue] = useState<StateValue>({
    warehouses: [searchParams.get("warehouse")?.toString() ?? ""],
    categories: [searchParams.get("category")?.toString() ?? ""],
    brands: [searchParams.get("brand")?.toString() ?? ""],
    is_active: ["all"],
  });
  const [selectedColumns, setSelectedColumns] = useState(
    columns.filter((col) => col.isDisplay).map((col) => col.uid)
  );
  const [loading, setLoading] = useTransition();
  const [loadingDownload, setLoadingDownload] = useState<boolean>(false);

  const {
    isOpen: isOpenFilter,
    onOpen: onOpenFilter,
    onClose: onCloseFilter,
  } = useDisclosure();
  const {
    isOpen: isOpenRelatory,
    onOpen: onOpenRelatory,
    onClose: onCloseRelatory,
  } = useDisclosure();

  const handleSelectionColumnsChange = (keys: SharedSelection) => {
    const arr = Array.from(typeof keys === "string" ? [keys] : keys);
    setSelectedColumns(arr as string[]);
  };

  return (
    <Container>
      <ToolBar
        title={title}
        addItemDescription={addItemDescription}
        handleAddItems={handleAddItems}
        onOpenFilter={onOpenFilter}
        onOpenRelatory={activateReportingOption && onOpenRelatory}
        clear={setValue}
        columns={columns}
        selectedColumns={selectedColumns}
        handleSelectionColumnsChange={handleSelectionColumnsChange}
        setLoading={setLoading}
      />
      {loading ? (
        <main className="xl:h-[440px] 2xl:h-[510px]">
          <Loading />
        </main>
      ) : (
        <Table
          columns={columns}
          selectedColumns={selectedColumns}
          pagination={pagination}
          data={data}
          setLoading={setLoading}
          renderCell={renderCell}
        />
      )}
      <Drawer
        title="Filtros"
        value={value}
        isOpen={isOpenFilter}
        displayFooterFilter={true}
        onClose={onCloseFilter}
        clear={setValue}
        loading={loading}
        setLoading={setLoading}
      >
        <DrawerFilter value={value} data={dataFilter} setValue={setValue} />
      </Drawer>
      <Drawer
        title="Configurar Relatório"
        isOpen={isOpenRelatory}
        onClose={onCloseRelatory}
        displayFooterRelatory
        loading={loadingDownload}
        handleDownload={() => {
          handleDownloadExcel({
            name,
            data,
            columns,
            selectedColumns,
            setLoading: setLoadingDownload,
          });
        }}
      >
        <DrawerRelatory
          name={name}
          extension={extension}
          selectedColumns={selectedColumns}
          columns={columns}
          relatoryData={relatoryData}
          handleSelectionColumnsChange={handleSelectionColumnsChange}
          onOpenFilter={onOpenFilter}
          setName={setname}
          setExtension={setExtension}
        />
      </Drawer>
    </Container>
  );
}
