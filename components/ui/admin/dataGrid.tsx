"use client";

// React
import { TransitionStartFunction, useState, useTransition } from "react";

// Bibliotecas
import { useDisclosure } from "@heroui/react";

// Next
import { useRouter, useSearchParams } from "next/navigation";

// Componentes
import Container from "../container";
import Table from "./table";
import ToolBar from "./toolbar";
import Loading from "./loading";
import Drawer from "./drawers/drawer";
import DrawerFilter from "./drawers/drawerFilter";

// Tipagem
import { ItemsColumns } from "@/types/columns";
import { FilterItem, StateValue } from "@/types/filter";

interface DataGridProps<T> {
  title: string;
  addItemDescription: string;
  handleAddItems: string;
  columns: ItemsColumns[];
  data: T[];
  dataFilter: FilterItem[];
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
  dataFilter,
  renderCell,
}: DataGridProps<T>) {
  const [value, setValue] = useState<StateValue>({
    warehouses: [],
    categories: [],
    brands: [],
  });
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
      <Drawer
        title="Filtros"
        value={value}
        isOpen={isOpen}
        displayFooter={true}
        onClose={onClose}
        clear={setValue}
      >
        <DrawerFilter value={value} data={dataFilter} setValue={setValue} />
      </Drawer>
    </Container>
  );
}
