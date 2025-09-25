"use client";

// Bibliotecas
import { Button } from "@heroui/button";
import {
  Divider,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Kbd,
  SharedSelection,
  Tooltip,
} from "@heroui/react";
import {
  ChevronDownIcon,
  Download,
  Ellipsis,
  FunnelPlus,
  FunnelX,
  Info,
  Plus,
  RefreshCcw,
  Search,
} from "lucide-react";

// Next
import { useRouter, useSearchParams } from "next/navigation";

// React
import { TransitionStartFunction, useRef, useState } from "react";

// Componentes
import Input from "../input";

// Tipagem
import { StateValue } from "@/types/filter";
import { ItemsColumns } from "@/types/columns";
interface ToolBarProps {
  title: string;
  addItemDescription: string;
  handleAddItems: string;
  columns: ItemsColumns[];
  selectedColumns: string[];
  onOpenFilter: () => void;
  onOpenRelatory?: () => void;
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
  onOpenFilter,
  onOpenRelatory,
  clear,
  handleSelectionColumnsChange,
  setLoading,
}: ToolBarProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");

  const router = useRouter();
  const searchParams = useSearchParams();

  const handleCleanChange = () => {
    const params = new URLSearchParams();

    router.push(`?${params.toString()}`);
    clear({
      brands: [],
      categories: [],
      warehouses: [],
      is_active: ["all"],
      orderByStock: [],
    });
    setSearch("");
    setLoading &&
      setLoading(() => {
        router.refresh();
      });
  };

  return (
    <main className="px-4 py-3 space-y-4">
      <div className="justify-start flex items-center">
        <h2 className="text-2xl font-bold text-gray-600 dark:text-white">
          {title}
        </h2>
      </div>

      <Divider />

      <div className="flex items-center justify-between">
        <Input
          className="w-96"
          startContent={<Search className="w-5 h-5 text-gray-500" />}
          endContent={
            <Kbd keys={["enter"]} className="font-semibold rounded-md">
              Enter
            </Kbd>
          }
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              const inputElement = e.currentTarget as HTMLInputElement;
              const params = new URLSearchParams(searchParams.toString());
              params.set("search", inputElement.value);
              router.push(`?${params.toString()}`);
              setLoading &&
                setLoading(() => {
                  router.refresh();
                });
            }
          }}
          placeholder="Digite para pesquisar"
        />
        <div className="flex items-center gap-3">
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
                endContent={<ChevronDownIcon className="w-4 h-4" />}
                radius="sm"
                variant="bordered"
                className="min-w-32 flex items-center justify-center font-semibold text-gray-500 w-full h-10 border border-gray-300"
                onPress={() => setIsOpen(!isOpen)}
              >
                Colunas
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              disallowEmptySelection
              aria-label="Table Columns"
              closeOnSelect={false}
              variant="flat"
              selectionMode="multiple"
              selectedKeys={selectedColumns}
              onSelectionChange={handleSelectionColumnsChange}
              classNames={{
                list: "max-h-[380px] p-2 h-full overflow-auto",
              }}
            >
              {columns.map((column) => (
                <DropdownItem
                  key={column.uid}
                  classNames={{
                    base: selectedColumns.includes(column.uid)
                      ? "bg-gray-200 text-gray-700"
                      : "",
                  }}
                  className="capitalize"
                >
                  {column.name}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
          <Button
            startContent={<RefreshCcw className="w-5 h-5" />}
            radius="sm"
            onPress={() => {
              setLoading(() => {
                router.refresh();
              });
            }}
            className="bg-[#3b82f6] min-w-36 font-semibold border border-gray-300 h-10 w-full text-white shadow-md transition duration-300"
          >
            Atualizar
          </Button>

          <Dropdown
            showArrow
            radius="md"
            placement="bottom-end"
            classNames={{
              base: "before:bg-default-200",
              content:
                "p-0 border-small border-divider bg-background min-h-[180px] h-full overflow-auto",
            }}
          >
            <DropdownTrigger>
              <Button
                isIconOnly
                variant="bordered"
                radius="sm"
                className="border h-10 min-w-10 w-full border-gray-400 dark:border-gray-600  transition"
              >
                <Ellipsis className="w-5 h-5 text-gray-700 dark:text-gray-300" />
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
                onPress={onOpenFilter}
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
                className={`${!onOpenRelatory && "hidden"}`}
                description="Baixe os dados em formato Excel"
                startContent={<Download className="w-5 h-5 text-success/70" />}
                onPress={onOpenRelatory}
              >
                Exportar para Relatório
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>
    </main>
  );
}
