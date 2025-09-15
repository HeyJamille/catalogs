// Bibliotecas
import {
  Drawer as Drw,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  Button,
} from "@heroui/react";
import { Columns, Download, FunnelX, Save } from "lucide-react";

// Next
import { useRouter, useSearchParams } from "next/navigation";

// React
import { ReactNode, TransitionStartFunction } from "react";

// Tipagem
import { StateValue } from "@/types/filter";
interface DrawerProps {
  title: string;
  isOpen: boolean;
  children: ReactNode;
  displayFooterFilter?: boolean;
  displayFooterRelatory?: boolean;
  value?: StateValue;
  position?: "top" | "right" | "bottom" | "left";
  onClose: () => void;
  clear?: (value: StateValue) => void;
  handleDownloadExcel?: () => void;
  setLoading?: TransitionStartFunction;
}

export default function Drawer({
  title,
  isOpen,
  children,
  displayFooterFilter,
  displayFooterRelatory,
  value,
  position,
  onClose,
  clear,
  handleDownloadExcel,
  setLoading,
}: DrawerProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleFilterChange = () => {
    const params = new URLSearchParams(searchParams.toString());

    value &&
      value.categories.forEach((category) => {
        if (category) {
          params.delete("category");
          params.append("category", category);
        }
      });
    value &&
      value.warehouses.forEach((warehouse) => {
        if (warehouse) {
          params.delete("warehouse");
          params.append("warehouse", warehouse);
        }
      });
    value &&
      value.brands.forEach((brand) => {
        if (brand) {
          params.delete("brand");
          params.append("brand", brand);
        }
      });
    value &&
      value.is_active.forEach((active) => {
        if (active) {
          params.delete("is_active");
          params.append("is_active", active);
        }
      });

    router.push(`?${params.toString()}`);
    setLoading &&
      setLoading(() => {
        router.refresh();
      });
  };

  const handleCleanChange = () => {
    const params = new URLSearchParams();

    router.push(`?${params.toString()}`);
    clear &&
      clear({
        brands: [],
        categories: [],
        warehouses: [],
        is_active: ["all"],
      });
    setLoading &&
      setLoading(() => {
        router.refresh();
      });
  };

  return (
    <Drw
      classNames={{ body: "px-2 py-0" }}
      isOpen={isOpen}
      size="sm"
      onClose={onClose}
      placement={position && position}
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
            {displayFooterFilter ||
              (displayFooterRelatory && (
                <DrawerFooter>
                  <Button
                    startContent={<FunnelX className="w-5 h-5" />}
                    color="danger"
                    radius="sm"
                    variant="light"
                    onPress={handleCleanChange}
                    className={`${displayFooterRelatory && "hidden"}`}
                  >
                    Limpar Filtro
                  </Button>
                  <Button
                    color="primary"
                    radius="sm"
                    startContent={
                      displayFooterFilter ? (
                        <Save className="w-5 h-5" />
                      ) : (
                        <Download className="w-5 h-5" />
                      )
                    }
                    onPress={
                      displayFooterFilter
                        ? handleFilterChange
                        : handleDownloadExcel
                    }
                  >
                    {displayFooterFilter ? "Aplicar Filtro" : "Abaixar arquivo"}
                  </Button>
                </DrawerFooter>
              ))}
          </>
        )}
      </DrawerContent>
    </Drw>
  );
}
