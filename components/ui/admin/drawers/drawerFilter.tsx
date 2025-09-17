"use client";

// Bibliotecas
import {
  Accordion,
  AccordionItem,
  Checkbox,
  CheckboxGroup,
} from "@heroui/react";

// Tipagem
import { ItemsLabels } from "@/types/labels";
import { StateValue } from "@/types/filter";

interface DrawerFilterProps {
  value: StateValue;
  data: {
    id: number;
    title: string;
    name: keyof StateValue;
    data: ItemsLabels[];
  }[];
  setValue: (value: StateValue) => void;
}

export default function DrawerFilter({
  value,
  data,
  setValue,
}: DrawerFilterProps) {
  return (
    <Accordion>
      {data.map((item) => (
        <AccordionItem
          key={item.id}
          aria-label="Almoxarifado"
          title={item.title}
          subtitle="Pressione para expandir"
          classNames={{
            trigger: "cursor-pointer ",
            base: "p-1",
            indicator: "text-gray-900",
            title: "font-semibold",
            content: "py-4",
          }}
        >
          <CheckboxGroup
            value={value[item.name]}
            onChange={(newValues: string[]) =>
              setValue({
                ...value,
                [item.name]: newValues.slice(-1),
              })
            }
            classNames={{
              base: "w-full flex flex-col gap-3",
            }}
          >
            {item.data.map((filter) => (
              <Checkbox
                key={filter.id}
                value={filter.id}
                size="md"
                radius="sm"
                classNames={{
                  base: "max-w-full border-1  border-gray-200 w-full flex items-center bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors p-3 focus:ring-2 focus:ring-blue-500",
                  label:
                    "w-full text-sm font-medium py-1 text-gray-700 dark:text-gray-200",
                }}
              >
                {filter.label}
              </Checkbox>
            ))}
          </CheckboxGroup>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
