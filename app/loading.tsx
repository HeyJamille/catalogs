"use client";

// Bibliotecas
import { Spinner } from "@heroui/react";

export default function LoadingOverlay() {
  return (
    <div className="flex flex-col gap-4 items-center justify-center h-screen">
      <Spinner
        size="lg"
        variant="default"
        classNames={{
          base: "w-16 h-16",
        }}
      />
      <p className="text-gray-700 text-lg font-medium text-center">
        Por gentileza, aguarde...
        <br />
        Estamos carregando as informações.
      </p>
    </div>
  );
}
