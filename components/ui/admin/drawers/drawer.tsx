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
  clear: (value: StateValue) => void;
}

export default function Drawer({
  title,
  isOpen,
  children,
  displayFooter,
  value,
  onClose,
  clear,
}: DrawerProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleFilterChange = () => {
    const params = new URLSearchParams(searchParams.toString());

    value.categories.forEach((category) => {
      if (category) {
        params.delete("category");
        params.append("category", category);
      }
    });
    value.warehouses.forEach((warehouse) => {
      if (warehouse) {
        params.delete("warehouse");
        params.append("warehouse", warehouse);
      }
    });
    value.brands.forEach((brand) => {
      if (brand) {
        params.delete("brand");
        params.append("brand", brand);
      }
    });

    router.push(`?${params.toString()}`);
    router.refresh();
  };

  const handleCleanChange = () => {
    const params = new URLSearchParams();

    router.push(`?${params.toString()}`);
    clear({ brands: [], categories: [], warehouses: [] });
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
                  onPress={handleCleanChange}
                >
                  Limpar Filtro
                </Button>
                <Button
                  color="primary"
                  startContent={<Save className="w-5 h-5" />}
                  onPress={handleFilterChange}
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
