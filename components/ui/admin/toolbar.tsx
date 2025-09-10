"use client";

// Bibliotecas
import { Button } from "@heroui/button";
import {
  Divider,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/react";
import {
  Download,
  Ellipsis,
  FunnelPlus,
  FunnelX,
  Plus,
  RefreshCcw,
} from "lucide-react";

// Next
import { useRouter } from "next/navigation";

// React
import { TransitionStartFunction } from "react";

// Tipagem
interface ToolBarProps {
  title: string;
  addItemDescription: string;
  handleAddItems: string;
  onOpen: () => void;
  setLoading: TransitionStartFunction;
}

export default function ToolBar({
  title,
  addItemDescription,
  handleAddItems,
  onOpen,
  setLoading,
}: ToolBarProps) {
  const router = useRouter();

  return (
    <main>
      <div className="px-6 py-4 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-600 dark:text-white">
          {title}
        </h2>
        <div className="flex items-center gap-4">
          <Button
            startContent={<RefreshCcw className="w-5 h-5" />}
            size="md"
            radius="sm"
            color="primary"
            onPress={() => {
              setLoading(() => {
                router.refresh();
              });
            }}
            className="bg-[#3b82f6] text-white shadow-md transition duration-300"
          >
            Atualizar
          </Button>
          <Button
            startContent={<Plus className="w-5 h-5" />}
            href={handleAddItems}
            as="a"
            size="md"
            radius="sm"
            color="success"
            className=" text-white shadow-md transition duration-300"
          >
            Cadastrar {addItemDescription}
          </Button>
          <Dropdown showArrow radius="md" placement="bottom-end">
            <DropdownTrigger>
              <Button
                isIconOnly
                variant="bordered"
                radius="sm"
                className="border-gray-300 dark:border-gray-600  transition"
              >
                <Ellipsis className="w-6 h-6 text-gray-700 dark:text-gray-300" />
              </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Mais opções" variant="light">
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
