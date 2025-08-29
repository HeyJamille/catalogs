// Bibliotecas
import { Spinner } from "@heroui/react";

export default function Loading() {
  return (
    <main className="p-4 mb-5 overflow-auto h-[530px]">
      <div className="w-full h-full flex items-center justify-center">
        <Spinner
          classNames={{
            label: "text-gray-400 font-semibold mt-4",
          }}
          size="lg"
          label="Carregando..."
          variant="default"
        />
      </div>
    </main>
  );
}
