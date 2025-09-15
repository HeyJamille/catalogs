// Dados
import columns from "@/data/columns/products/columns.json";

// Bibliotecas
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";

export default async function handleDownloadExcel({
  selectedColumns,
}: {
  selectedColumns: string[];
}) {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("Relatório de Produtos");

  worksheet.columns = columns
    .filter((col) => selectedColumns.includes(col.uid))
    .map((col) => ({
      header: col.name,
      key: col.uid,
      width: 20,
    }));
}
