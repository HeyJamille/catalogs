"use client";

// Biblioteca
import { Autocomplete as AtcUI, AutocompleteItem } from "@heroui/react";

// tipagem
interface AutoCompleteProps {
  lable: string;
  name?: string;
  placeholder: string;
  data: { id: string; label: string }[];
}

export default function Autocomplete({
  lable,
  name,
  placeholder,
  data,
}: AutoCompleteProps) {
  return (
    <AtcUI
      radius="sm"
      variant="bordered"
      className="w-full"
      label={lable}
      placeholder={placeholder}
      name={name}
      labelPlacement="outside-top"
      inputProps={{
        size: "md",
        classNames: {
          inputWrapper:
            "border-1  border-gray-400 w-full data-[hover=true]:border-blue-500 group-data-[focus=true]:border-blue-800",
          label: "font-semibold",
        },
      }}
    >
      {data.map((items) => (
        <AutocompleteItem key={items.id}>{items.label}</AutocompleteItem>
      ))}
    </AtcUI>
  );
}
