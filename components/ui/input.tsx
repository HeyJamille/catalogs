"use client";

// React
import { ComponentProps, useState } from "react";

// Bibliotecas
import { Input as Inp } from "@heroui/input";
import { MoneyMaskInput } from "@/utils/mask/inputMask";

// Tipagem
type InputProps = ComponentProps<typeof Inp> & {
  label: string;
  isRequired?: boolean;
  placeholder: string;
  maskMoney?: boolean;
  error?: boolean;
};

export default function Input({
  label,
  placeholder,
  isRequired,
  error,
  maskMoney = false,
  ...rest
}: InputProps) {
  const [value, setValue] = useState("");

  const { handleChange } = MoneyMaskInput({ setValue });

  return (
    <Inp
      isRequired={isRequired}
      size="md"
      variant="bordered"
      radius="sm"
      label={label}
      labelPlacement="outside"
      placeholder={placeholder}
      className="pt-[0.28rem] w-full"
      onChange={maskMoney ? handleChange : undefined}
      value={maskMoney ? value : undefined}
      classNames={{
        inputWrapper:
          "border-1  border-gray-400 data-[hover=true]:border-blue-500 group-data-[focus=true]:border-blue-800",
        label: "font-semibold",
      }}
      {...rest}
    />
  );
}
