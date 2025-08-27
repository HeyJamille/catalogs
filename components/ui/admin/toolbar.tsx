"use client";

// Bibliotecas
import { Button } from "@heroui/button";
import { Divider } from "@heroui/react";
import { Plus, RefreshCcw } from "lucide-react";
import { useRouter } from "next/navigation";

// Tipagem
interface ToolBarProps {
  title: string;
  addItemDescription: string;
  handleAddItems: string;
}

export default function ToolBar({
  title,
  addItemDescription,
  handleAddItems,
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
            radius="lg"
            color="primary"
            onPress={() => router.refresh()}
            className="bg-[#3b82f6] text-white shadow-md transition duration-300"
          >
            Atualizar
          </Button>
          <Button
            startContent={<Plus className="w-5 h-5" />}
            // onClick={() => handleAddItems()}
            href={handleAddItems}
            as="a"
            size="md"
            radius="lg"
            color="success"
            className=" text-white shadow-md transition duration-300"
          >
            Cadastrar {addItemDescription}
          </Button>
        </div>
      </div>
      <div className="px-4">
        <Divider />
      </div>
    </main>
  );
}
