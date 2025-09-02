"use client";

// React
import { ReactNode } from "react";

// Bibliotecas
import { Button } from "@heroui/react";
import { ChevronLeft, Save } from "lucide-react";

// Tipagem
interface FormProps {
  handleForm: (e: React.FormEvent) => void;
  children: ReactNode;
  href: string;
  loading: boolean;
}

export default function Form({
  handleForm,
  href,
  children,
  loading,
}: FormProps) {
  return (
    <form
      onSubmit={handleForm}
      className="flex-col flex items-center p-5 space-y-5"
    >
      <main className="w-full flex">
        <div className="w-full flex justify-start space-x-4">
          <h2 className="text-2xl text-start font-bold text-gray-600 dark:text-white">
            Produtos
          </h2>
        </div>
        <div className="space-x-2 flex items-center">
          <Button
            size="md"
            radius="sm"
            type="submit"
            isLoading={loading}
            startContent={!loading && <Save className="w-5 h-5" />}
            className="bg-[#3b82f6] text-gray-200 min-w-24"
          >
            Salvar Produto
          </Button>
          <Button
            startContent={<ChevronLeft className="w-5 h-5" />}
            size="md"
            as="a"
            href={href}
            radius="sm"
            variant="bordered"
            className="border-gray-300 border-1 bg-white min-w-24"
          >
            Voltar
          </Button>
        </div>
      </main>
      <div className="w-full grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {children}
      </div>
    </form>
  );
}
