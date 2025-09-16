"use client";

// React
import { TransitionStartFunction, useState, useTransition } from "react";

// Next
import { useSearchParams } from "next/navigation";

// Bibliotecas
import { SharedSelection, useDisclosure } from "@heroui/react";
import { jsPDF } from "jspdf";
import { autoTable } from "jspdf-autotable";

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
  const handleDownloadPDF = () => {
    const doc = new jsPDF();

    const getNestedValue = (obj: any, path: string): any => {
      return path.split(".").reduce((acc, key) => {
        if (acc === null || acc === undefined) return undefined;
        return acc[key];
      }, obj);
    };

    const hasCostOfGoods = columns.some((col) => col.uid === "cost_of_goods");

    const selectedColumnsData = columns
      .filter(
        (col) => selectedColumns.includes(col.uid) && col.uid !== "actions"
      )
      .map((col) => (col.abbreviation ? col.abbreviation : col.name));

    const rows = data.map((row) => {
      const newRow = [];

      columns.forEach((col) => {
        if (selectedColumns.includes(col.uid)) {
          newRow.push(getNestedValue(row, col.uid));
        }
      });

      if (hasCostOfGoods) {
        const costPrice = getNestedValue(row, "stock.cost_price");
        const currentQuantity = getNestedValue(row, "stock.current_quantity");
        if (costPrice !== undefined && currentQuantity !== undefined) {
          newRow.push(costPrice * currentQuantity);
        }
      }

      return newRow;
    });

    autoTable(doc, {
      head: [selectedColumnsData],
      body: rows,
      startY: 15,
      theme: "striped",
      headStyles: {
        fillColor: [59, 130, 246],
        textColor: [255, 255, 255],
        fontStyle: "bold",
        halign: "center",
        valign: "middle",
      },
      columnStyles: {
        0: { cellWidth: 20, overflow: "hidden" },
        1: { cellWidth: 20, overflow: "hidden" },
        2: { cellWidth: 215, overflow: "hidden" },
        3: { cellWidth: 25, overflow: "hidden" },
        4: { cellWidth: 25, overflow: "hidden" },
        5: { cellWidth: 25, overflow: "hidden" },
        6: { cellWidth: 25, overflow: "hidden" },
        7: { cellWidth: 25, overflow: "hidden" },
        8: { cellWidth: 25, overflow: "hidden" },
        9: { cellWidth: 25, overflow: "hidden" },
        10: { cellWidth: 25, overflow: "hidden" },
        11: { cellWidth: 25, overflow: "hidden" },
        12: { cellWidth: 25, overflow: "hidden" },
        13: { cellWidth: 25, overflow: "hidden" },
      },
      styles: {
        fontSize: 10,
        cellPadding: 5,
        halign: "center",
        valign: "middle",
        overflow: "linebreak",
      },
    });

    doc.save("tabela.pdf");
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
        title="Configurar Relatório"
        isOpen={isOpenRelatory}
        onClose={onCloseRelatory}
        displayFooterRelatory
        handleDownload={() => {
          extension.includes("excel")
            ? handleDownloadExcel({ name, data, columns, selectedColumns })
            : handleDownloadPDF();
        }}
      >
        <DrawerRelatory
          name={name}
          extension={extension}
          selectedColumns={selectedColumns}
          columns={columns}
          handleSelectionColumnsChange={handleSelectionColumnsChange}
          onOpenFilter={onOpenFilter}
          setName={setname}
          setExtension={setExtension}
        />
      </Drawer>
    </Container>
  );
}
