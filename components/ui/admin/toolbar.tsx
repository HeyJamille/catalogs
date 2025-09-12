"use client";

// Bibliotecas
import { Button } from "@heroui/button";
import {
  Divider,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  SharedSelection,
} from "@heroui/react";
import {
  ChevronDownIcon,
  Download,
  Ellipsis,
  Eye,
  EyeClosed,
  FunnelPlus,
  FunnelX,
  Plus,
  RefreshCcw,
} from "lucide-react";

// Next
import { useRouter } from "next/navigation";

// React
import { TransitionStartFunction, useState } from "react";

// Tipagem
import { StateValue } from "@/types/filter";
import { ItemsColumns } from "@/types/columns";
interface ToolBarProps {
  title: string;
  addItemDescription: string;
  handleAddItems: string;
  columns: ItemsColumns[];
  selectedColumns: string[];
  onOpen: () => void;
  clear: (value: StateValue) => void;
  handleSelectionColumnsChange: (keys: SharedSelection) => void;
  setLoading: TransitionStartFunction;
}

export default function ToolBar({
  title,
  addItemDescription,
  handleAddItems,
  columns,
  selectedColumns,
  onOpen,
  clear,
  handleSelectionColumnsChange,
  setLoading,
}: ToolBarProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const router = useRouter();

  const handleCleanChange = () => {
    const params = new URLSearchParams();

    router.push(`?${params.toString()}`);
    clear({
      brands: [],
      categories: [],
      warehouses: [],
      is_active: ["all"],
    });
    setLoading &&
      setLoading(() => {
        router.refresh();
      });
  };

  return (
    <main>
      <div className="px-6 py-4 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-600 dark:text-white">
          {title}
        </h2>
        <div className="flex items-center gap-4">
          <Dropdown
            showArrow
            placement="bottom-end"
            classNames={{
              base: "before:bg-default-200",
              content:
                "p-0 border-small border-divider bg-background min-w-[280px]",
            }}
          >
            <DropdownTrigger className="hidden sm:flex">
              <Button
                endContent={
                  <ChevronDownIcon className="text-gray-600 w-5 h-5" />
                }
                size="md"
                radius="sm"
                variant="flat"
                className="min-w-32 font-semibold text-gray-700 w-full h-9 border border-gray-300"
                onPress={() => setIsOpen(!isOpen)}
              >
                Colunas
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              disallowEmptySelection
              aria-label="Table Columns"
              closeOnSelect={false}
              color="primary"
              selectionMode="multiple"
              selectedKeys={selectedColumns}
              onSelectionChange={handleSelectionColumnsChange}
            >
              {columns.map((column) => (
                <DropdownItem key={column.uid} className="capitalize">
                  {column.name}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
          <Button
            startContent={<RefreshCcw className="w-4 h-4 font-semibold" />}
            size="md"
            radius="sm"
            onPress={() => {
              setLoading(() => {
                router.refresh();
              });
            }}
            className="bg-[#3b82f6] font-semibold min-w-32 border border-gray-300 h-9 w-full text-white shadow-md transition duration-300"
          >
            Atualizar
          </Button>
          <Dropdown
            showArrow
            radius="md"
            placement="bottom-end"
            classNames={{
              base: "before:bg-default-200",
              content: "p-0 border-small border-divider bg-background",
            }}
          >
            <DropdownTrigger>
              <Button
                isIconOnly
                variant="bordered"
                radius="sm"
                className="border h-9 min-w-9 w-full border-gray-400 dark:border-gray-600  transition"
              >
                <Ellipsis className="w-6 h-6 text-gray-700 dark:text-gray-300" />
              </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Mais opções" variant="light">
              <DropdownItem
                key="register"
                description={`Adicionar um novo ${addItemDescription}`}
                href={handleAddItems}
                startContent={<Plus className="w-5 h-5 text-success/80" />}
              >
                Cadastrar {addItemDescription}
              </DropdownItem>
              <DropdownItem
                key="filters"
                description="Refine os resultados exibidos"
                onPress={onOpen}
                startContent={
                  <FunnelPlus className="w-5 h-5 text-primary/70" />
                }
              >
                Aplicar filtros
              </DropdownItem>
              <DropdownItem
                key="clearFilter"
                description="Voltar à visualização padrão"
                startContent={<FunnelX className="w-5 h-5 text-danger/70" />}
                onPress={handleCleanChange}
              >
                Limpar filtros
              </DropdownItem>
              <DropdownItem
                key="exportExcel"
                description="Baixe os dados em formato Excel"
                startContent={<Download className="w-5 h-5 text-success/70" />}
              >
                Exportar para Excel
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>
      <div className="px-4">
        <Divider />
      </div>
    </main>
  );
}
