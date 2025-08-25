// Bibliotecas
import { Button } from "@heroui/button";
import { Plus, RefreshCcw } from "lucide-react";

// Tipagem
interface ToolBarProps {
  title: string;
  addItemDescription: string;
  handleRefresh: () => void;
  handleAddItems: () => void;
}

export default function ToolBar({
  title,
  addItemDescription,
  handleRefresh,
  handleAddItems,
}: ToolBarProps) {
  return (
    <div className="px-6 py-4 flex items-center justify-between border-b border-gray-200 dark:border-gray-700">
      <h2 className="text-2xl font-bold text-gray-600 dark:text-white">
        {title}
      </h2>
      <div className="flex items-center gap-4">
        <Button
          startContent={<RefreshCcw className="w-5 h-5" />}
          size="md"
          radius="lg"
          color="primary"
          className="bg-[#3b82f6] text-white shadow-md transition duration-300"
        >
          Atualizar
        </Button>
        <Button
          startContent={<Plus className="w-5 h-5" />}
          size="md"
          radius="lg"
          color="success"
          className=" text-white shadow-md transition duration-300"
        >
          Cadastrar {addItemDescription}
        </Button>
      </div>
    </div>
  );
}
