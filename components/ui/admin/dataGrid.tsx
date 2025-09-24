"use client";

// React
import { TransitionStartFunction, useState, useTransition } from "react";

// Bibliotecas
import { SharedSelection, useDisclosure } from "@heroui/react";
import { setupApiClient } from "@/utils/api/fetchData";
import Cookies from "js-cookie";

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
import { filterParams } from "@/utils/filters/filterParams";

// Tipagem
import { ItemsColumns } from "@/types/columns";
import { FilterItem } from "@/types/filter";
import { Paginations } from "@/types/pagination";

interface DataGridProps<T> {
  title: string;
  addItemDescription: string;
  handleAddItems: string;
  columns: ItemsColumns[];
  data: T[];
  relatoryData?: T[];
  dataFilter: FilterItem[];
  typeRelatory: { id: string; label: string; disable: boolean }[];
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
  relatoryData,
  dataFilter,
  typeRelatory,
  activateReportingOption = false,
  pagination,
  renderCell,
}: DataGridProps<T>) {
  const [name, setname] = useState("");
  const [extension, setExtension] = useState<string[]>(["excel"]);
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
  const { value, setValue } = filterParams();

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
            data: relatoryData,
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
          typeRelatory={typeRelatory}
          handleSelectionColumnsChange={handleSelectionColumnsChange}
          onOpenFilter={onOpenFilter}
          setName={setname}
          setExtension={setExtension}
        />
      </Drawer>
    </Container>
  );
}
