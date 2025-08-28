// Bibliotecas
import { Input as Inp } from "@heroui/input";

// Tipagem
interface InputProps {
  label: string;
  isRequired?: boolean;
  placeholder: string;
  error?: boolean;
}

export default function Input({
  label,
  placeholder,
  isRequired,
  error,
}: InputProps) {
  return (
    <Inp
      isRequired={isRequired}
      size="md"
      variant="bordered"
      radius="sm"
      label={label}
      labelPlacement="outside"
      name="name"
      placeholder={placeholder}
      className="pt-[0.28rem] w-full"
      classNames={{
        inputWrapper:
          "border-1  border-gray-400 data-[hover=true]:border-blue-500 group-data-[focus=true]:border-blue-800",
        label: "font-semibold",
      }}
    />
  );
}
