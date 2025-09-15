// Bibliotecas
import {
  Checkbox,
  CheckboxGroup,
  Listbox,
  ListboxItem,
  SharedSelection,
} from "@heroui/react";
import { Divider } from "@heroui/react";
import { Info } from "lucide-react";

// Tipagem
import { ItemsColumns } from "@/types/columns";
interface DrawerRelatoryProps {
  selectedColumns: string[];
  columns: ItemsColumns[];
  handleSelectionColumnsChange: (keys: SharedSelection) => void;
}

export default function DrawerRelatory({
  selectedColumns,
  columns,
  handleSelectionColumnsChange,
}: DrawerRelatoryProps) {
  return (
    <main className="px-4 space-y-4">
      <CheckboxGroup
        defaultValue={["xls"]}
        classNames={{ wrapper: "pl-3" }}
        label="Formato do arquivo"
      >
        <Checkbox
          key="xls"
          size="md"
          radius="sm"
          classNames={{ label: "text-sm font-semibold" }}
          value="xls"
        >
          Excel (.XLS)
        </Checkbox>
        <Checkbox
          key="pdf"
          size="md"
          radius="sm"
          classNames={{ label: "text-sm font-semibold" }}
          value=".pdf"
        >
          PDF (.PDF)
        </Checkbox>
      </CheckboxGroup>
      <div className="flex flex-col gap-2">
        <span className="relative text-medium text-foreground-500">
          Colunas visíveis
        </span>
        <div className="w-full h-[330px] overflow-auto border px-1 py-2 rounded-small border-gray-300">
          <Listbox
            disallowEmptySelection
            aria-label="select columns"
            selectedKeys={selectedColumns}
            selectionMode="multiple"
            variant="flat"
            color="primary"
            onSelectionChange={handleSelectionColumnsChange}
          >
            {columns.map((column) => (
              <ListboxItem
                key={column.uid}
                classNames={{
                  base: selectedColumns.includes(column.uid)
                    ? "bg-gray-200 text-gray-700"
                    : "",
                  title: "font-semibold",
                }}
              >
                {column.name}
              </ListboxItem>
            ))}
          </Listbox>
        </div>
      </div>
      <Divider />
      <div className="w-full flex items-center space-x-2 justify-center text-gray-400">
        <Info className="w-5 h-5" />
        <p className="text-sm">Relatório gerado conforme filtros aplicados</p>
      </div>
    </main>
  );
}
