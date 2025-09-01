"use client";

// Bibliotecas
import { Textarea } from "@heroui/input";
import { ComponentProps } from "react";

// Tipagem
type CommentAreaProps = ComponentProps<typeof Textarea>;

export default function CommentArea({ ...rest }: CommentAreaProps) {
  return (
    <Textarea
      isClearable
      labelPlacement="outside-top"
      radius="sm"
      className="w-full"
      classNames={{
        inputWrapper:
          "border-1  border-gray-400 data-[hover=true]:border-blue-500 group-data-[focus=true]:border-blue-800",
        input: "min-h-[80px]",
        label: "font-semibold",
      }}
      placeholder=""
      variant="bordered"
      disableAutosize
      {...rest}
      // eslint-disable-next-line no-console
      //   onClear={() => console.log("textarea cleared")}
    />
  );
}
