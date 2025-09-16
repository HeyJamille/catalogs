// Bibliotecas
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";

// Tipagem
import { ItemsColumns } from "@/types/columns";
interface HandleDownloadExcelProps<T> {
  name?: string;
  selectedColumns: string[];
  data: T[];
  columns: ItemsColumns[];
}

export default async function handleDownloadExcel<T>({
  name,
  selectedColumns,
  data,
  columns,
}: HandleDownloadExcelProps<T>) {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("Relatório");

  const getNestedValue = (obj: any, path: string): any => {
    return path.split(".").reduce((acc, key) => {
      if (acc === null || acc === undefined) return undefined;
      return acc[key];
    }, obj);
  };

  const hasCostOfGoods = columns.some((col) => col.uid === "cost_of_goods");

  worksheet.columns = columns
    .filter((col) => selectedColumns.includes(col.uid))
    .map((col) => ({
      header: col.name,
      key: col.uid,
      width: 20,
      hidden: col.uid === "actions",
    }));

  worksheet.columns.forEach((col, index) => {
    const headerCell = worksheet.getCell(`${String.fromCharCode(65 + index)}1`);
    headerCell.style = {
      font: { bold: true, color: { argb: "FFFFFF" } },
      alignment: { horizontal: "center", vertical: "middle" },
      fill: { type: "pattern", pattern: "solid", fgColor: { argb: "3b82f6" } },
    };
  });

  data.forEach((row, rowIndex) => {
    const newRow: Record<string, any> = {};

    columns.forEach((col) => {
      if (selectedColumns.includes(col.uid)) {
        newRow[col.uid] = getNestedValue(row, col.uid);
      }
    });

    if (hasCostOfGoods) {
      const costPrice = getNestedValue(row, "stock.cost_price");
      const currentQuantity = getNestedValue(row, "stock.current_quantity");
      if (costPrice !== undefined && currentQuantity !== undefined) {
        newRow["cost_of_goods"] = costPrice * currentQuantity;
      }
    } else {
      newRow["cost_of_goods"] = {
        formula: `B${rowIndex + 2}*C${rowIndex + 2}`,
      };
    }

    worksheet.addRow(newRow).eachCell((cell) => {
      if (rowIndex % 2 === 0) {
        cell.style.fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: "F2F2F2" },
        };
      } else {
        cell.style.fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: "FFFFFF" },
        };
      }
      cell.style.border = undefined;
    });
  });

  const buffer = await workbook.xlsx.writeBuffer();
  saveAs(new Blob([buffer]), `${name ? name : "relatorio"}.xlsx`);
}
