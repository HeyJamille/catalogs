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
      className="flex-col flex items-center space-y-4"
    >
      <div className="w-full grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-2">
        {children}
      </div>
      <div className="w-full flex justify-end space-x-4">
        <Button
          startContent={<ChevronLeft className="w-5 h-5" />}
          size="md"
          as="a"
          href={href}
          radius="sm"
          variant="bordered"
          className="border-gray-300 border-1 bg-white min-w-32"
        >
          Voltar
        </Button>
        <Button
          size="md"
          radius="sm"
          type="submit"
          isLoading={loading}
          startContent={!loading && <Save className="w-5 h-5" />}
          className="bg-[#3b82f6] text-gray-200 min-w-32"
        >
          Cadastrar Produto
        </Button>
      </div>
    </form>
  );
}
