// Bibliotecas
import {
  Button,
  Checkbox,
  CheckboxGroup,
  Listbox,
  ListboxItem,
  SharedSelection,
} from "@heroui/react";
import { Divider } from "@heroui/react";
import { Filter, Info } from "lucide-react";
import Input from "../../input";

// Tipagem
import { ItemsColumns } from "@/types/columns";
interface DrawerRelatoryProps {
  name: string;
  extension: string[];
  selectedColumns: string[];
  columns: ItemsColumns[];
  relatoryData: { id: string; label: string; disable: boolean }[];
  onOpenFilter: () => void;
  handleSelectionColumnsChange: (keys: SharedSelection) => void;
  setName: (value: string) => void;
  setExtension: (value: string[]) => void;
}

export default function DrawerRelatory({
  name,
  extension,
  selectedColumns,
  columns,
  relatoryData,
  onOpenFilter,
  handleSelectionColumnsChange,
  setName,
  setExtension,
}: DrawerRelatoryProps) {
  return (
    <main className="px-4 space-y-4">
      {relatoryData.map((item) => (
        <CheckboxGroup
          key={item.id}
          classNames={{ wrapper: "pl-3" }}
          defaultValue={["excel"]}
          label="Formato do arquivo"
          value={extension}
          onChange={(value: string[]) => setExtension(value.slice(-1))}
          isDisabled={item.disable}
        >
          <Checkbox
            classNames={{ label: "text-sm font-semibold" }}
            value={item.id}
          >
            {item.label}
          </Checkbox>
        </CheckboxGroup>
      ))}

      <div className="flex flex-col gap-2">
        <Input
          name={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="relatório"
          label="Nome do arquivo (opcional)"
          description="Se deixar em branco, usaremos “relatório” como nome padrão."
        />
      </div>
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
      <Button
        radius="sm"
        color="success"
        startContent={<Filter className="w-5 h-5 " />}
        className="w-full font-semibold text-white"
        onPress={onOpenFilter}
      >
        Aplicar filtros
      </Button>
      <Divider />
      <div className="w-full flex items-center space-x-2 justify-center text-gray-400">
        <Info className="w-5 h-5" />
        <p className="text-sm">Relatório gerado conforme filtros aplicados</p>
      </div>
    </main>
  );
}
