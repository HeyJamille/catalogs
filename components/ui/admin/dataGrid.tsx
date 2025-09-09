"use client";

// React
import { TransitionStartFunction, useTransition } from "react";

// Bibliotecas
import {
  Accordion,
  AccordionItem,
  Checkbox,
  CheckboxGroup,
  useDisclosure,
} from "@heroui/react";

// Componentes
import Container from "../container";
import Table from "./table";
import ToolBar from "./toolbar";
import Loading from "./loading";
import Drawer from "./drawers/drawer";

// Tipagem
import { ItemsColumns } from "@/types/columns";
interface DataGridProps<T> {
  title: string;
  addItemDescription: string;
  handleAddItems: string;
  columns: ItemsColumns[];
  data: T[];
  renderCell: (
    item: T,
    columnUid: string,
    setLoading: TransitionStartFunction
  ) => React.ReactNode;
}

export default function DataGrid<T>({
  title,
  addItemDescription,
  handleAddItems,
  columns,
  data,
  renderCell,
}: DataGridProps<T>) {
  const [loading, setLoading] = useTransition();

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Container>
      <ToolBar
        title={title}
        addItemDescription={addItemDescription}
        handleAddItems={handleAddItems}
        onOpen={onOpen}
        setLoading={setLoading}
      />
      {loading ? (
        <main className="h-[530px]">
          <Loading />
        </main>
      ) : (
        <Table
          columns={columns}
          data={data}
          setLoading={setLoading}
          renderCell={renderCell}
        />
      )}
      <Drawer title="Filtros" isOpen={isOpen} onClose={onClose}>
        <Accordion>
          <AccordionItem
            key="1"
            aria-label="Almoxarifado"
            subtitle="Pressione para expandir"
            title="Filtrar por almoxarifado"
            classNames={{
              indicator: "text-gray-900",
              title: "font-semibold",
            }}
          >
            <CheckboxGroup classNames={{ base: "w-full flex flex-col gap-2" }}>
              {["Almoxarifado A", "Almoxarifado B", "Almoxarifado C"].map(
                (item, index) => (
                  <Checkbox
                    key={index}
                    size="md"
                    radius="sm"
                    classNames={{
                      base: "max-w-full w-full flex items-center bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors p-3 focus:ring-2 focus:ring-blue-500",
                      label:
                        "w-full text-sm font-medium text-gray-700 dark:text-gray-200",
                    }}
                  >
                    {item}
                  </Checkbox>
                )
              )}
            </CheckboxGroup>
          </AccordionItem>
          <AccordionItem
            key="2"
            aria-label="Accordion 2"
            subtitle="Pressione para expandir"
            title="Accordion 2"
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor
          </AccordionItem>
        </Accordion>
      </Drawer>
    </Container>
  );
}
