"use client";

// Bibliotecas
import { Textarea } from "@heroui/input";

export default function CommentArea({ label }: { label: string }) {
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
      label={label}
      placeholder=""
      variant="bordered"
      disableAutosize
      // eslint-disable-next-line no-console
      //   onClear={() => console.log("textarea cleared")}
    />
  );
}
