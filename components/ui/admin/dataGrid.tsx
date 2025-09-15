"use client";

// React
import { TransitionStartFunction, useState, useTransition } from "react";

// Next
import { useSearchParams } from "next/navigation";

// Bibliotecas
import { SharedSelection, useDisclosure } from "@heroui/react";

// Componentes
import Container from "../container";
import Table from "./table";
import ToolBar from "./toolbar";
import Loading from "./loading";
import Drawer from "./drawers/drawer";
import DrawerFilter from "./drawers/drawerFilter";
import DrawerRelatory from "./drawers/drawerRelatory";

// Tipagem
import { ItemsColumns } from "@/types/columns";
import { FilterItem, StateValue } from "@/types/filter";
import handleDownloadExcel from "@/utils/relatorys/excel/handleDownloadExcel";

interface DataGridProps<T> {
  title: string;
  addItemDescription: string;
  handleAddItems: string;
  columns: ItemsColumns[];
  data: T[];
  dataFilter: FilterItem[];
  activateReportingOption?: Boolean;
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
  activateReportingOption = false,
  renderCell,
}: DataGridProps<T>) {
  const searchParams = useSearchParams();
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
        <main className="h-[530px]">
          <Loading />
        </main>
      ) : (
        <Table
          columns={columns}
          selectedColumns={selectedColumns}
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
        setLoading={setLoading}
      >
        <DrawerFilter value={value} data={dataFilter} setValue={setValue} />
      </Drawer>
      <Drawer
        title="Relatório"
        isOpen={isOpenRelatory}
        onClose={onCloseRelatory}
        displayFooterRelatory
        handleDownloadExcel={() => {
          handleDownloadExcel({ data, columns, selectedColumns });
        }}
      >
        <DrawerRelatory
          selectedColumns={selectedColumns}
          columns={columns}
          handleSelectionColumnsChange={handleSelectionColumnsChange}
        />
      </Drawer>
    </Container>
  );
}
