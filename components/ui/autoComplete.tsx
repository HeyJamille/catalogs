"use client";

// React
import React from "react";

// Biblioteca
import { Autocomplete as AtcUI, AutocompleteItem } from "@heroui/react";

// tipagem
interface AutoCompleteProps {
  lable: string;
  name?: string;
  isRequired?: boolean;
  placeholder: string;
  value?: React.Key | string | null;
  setValue?: (value: React.Key | string | null) => void;
  data: { id: string; label: string }[];
}

export default function Autocomplete({
  lable,
  name,
  isRequired,
  value,
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
      onSelectionChange={(key) => (value = key)}
      isRequired={isRequired}
      defaultItems={data}
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
      {(data) => (
        <AutocompleteItem key={data.id}>{data.label}</AutocompleteItem>
      )}
    </AtcUI>
  );
}
