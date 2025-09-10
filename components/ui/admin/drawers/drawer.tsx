// Bibliotecas
import { StateValue } from "@/types/filter";
import {
  Drawer as Drw,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  Button,
} from "@heroui/react";
import { FunnelX, Save } from "lucide-react";

// Next
import { useRouter, useSearchParams } from "next/navigation";

// React
import { ReactNode } from "react";

// Tipagem
interface DrawerProps {
  title: string;
  isOpen: boolean;
  children: ReactNode;
  displayFooter: boolean;
  value: StateValue;
  onClose: () => void;
}

export default function Drawer({
  title,
  isOpen,
  children,
  displayFooter,
  value,
  onClose,
}: DrawerProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleFilterChange = (filterKey: string, values: string[]) => {
    const params = new URLSearchParams(searchParams.toString());

    // Remover o parâmetro existente para evitar duplicação
    params.delete(filterKey);

    // Adicionar cada valor como um parâmetro separado
    values.forEach((value) => {
      if (value) {
        params.append(filterKey, value);
      }
    });

    // Atualizar a URL com os novos parâmetros
    router.push(`?${params.toString()}`);
    router.refresh();
  };

  const handleCleanChange = () => {
    const params = new URLSearchParams();

    router.push(`?${params.toString()}`);
  };

  return (
    <Drw
      classNames={{ body: "px-2 py-0" }}
      isOpen={isOpen}
      size="md"
      onClose={onClose}
    >
      <DrawerContent>
        {(onClose) => (
          <>
            <DrawerHeader className="flex flex-col gap-1">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                {title}
              </h2>
            </DrawerHeader>
            <DrawerBody className="w-full">{children}</DrawerBody>
            {displayFooter && (
              <DrawerFooter>
                <Button
                  startContent={<FunnelX className="w-5 h-5" />}
                  color="danger"
                  variant="light"
                  onPress={() => handleCleanChange()}
                >
                  Limpar Filtro
                </Button>
                <Button
                  color="primary"
                  startContent={<Save className="w-5 h-5" />}
                  onPress={() => {
                    handleFilterChange("categories", value.categories);
                    // handleFilterChange("warehouses", value.warehouses);
                    // handleFilterChange("brands", value.brands);
                  }}
                >
                  Salvar Filtro
                </Button>
              </DrawerFooter>
            )}
          </>
        )}
      </DrawerContent>
    </Drw>
  );
}
