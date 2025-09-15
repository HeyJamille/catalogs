// Bibliotecas
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";

// Tipagem
import { ItemsColumns } from "@/types/columns";
interface HandleDownloadExcelProps<T> {
  selectedColumns: string[];
  data: T[];
  columns: ItemsColumns[];
}

export default async function handleDownloadExcel<T>({
  selectedColumns,
  data,
  columns,
}: HandleDownloadExcelProps<T>) {
  const getNestedValue = (obj: any, path: string): any => {
    return path.split(".").reduce((acc, key) => {
      if (acc === null || acc === undefined) return undefined;
      return acc[key];
    }, obj);
  };

  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("Relatório");

  worksheet.columns = columns
    .filter((col) => selectedColumns.includes(col.uid))
    .map((col) => ({
      header: col.name,
      key: col.uid,
      width: 20,
    }));

  data.forEach((row) => {
    const newRow: Record<string, any> = {};

    columns.forEach((col) => {
      if (selectedColumns.includes(col.uid)) {
        newRow[col.uid] = getNestedValue(row, col.uid);
      }
    });
    worksheet.addRow(newRow);
  });

  const buffer = await workbook.xlsx.writeBuffer();
  saveAs(new Blob([buffer]), "relatorio.xlsx");
}
