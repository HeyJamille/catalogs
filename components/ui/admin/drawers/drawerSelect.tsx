// Componentes
import Input from "../../input";
import Loading from "../loading";

// Bibliotecas
import { CircleFadingPlus, Pencil, Trash } from "lucide-react";
import { Button, Checkbox, Divider } from "@heroui/react";

// Tipagem
import { ItemsAutoComplete } from "@/types/autoComplete";
interface DrawerSelectProps {
  data: ItemsAutoComplete[];
  loading: boolean;
  handleRemove: (value: string) => void;
}

export default function DrawerSelect({
  data,
  loading,
  handleRemove,
}: DrawerSelectProps) {
  return (
    <>
      <Input placeholder="Buscar categoria" />
      <Divider />
      <Button
        startContent={<CircleFadingPlus className="w-5 h-5" />}
        className="bg-transparent min-w-0 h-7 px-0 text-blue-500"
        // onPress={() => onOpen()}
      >
        <p className="hover:underline underline-offset-1">Adicione uma marca</p>
      </Button>
      <Divider />
      {loading ? (
        <Loading />
      ) : (
        data.map((item) => (
          <main
            key={item.id}
            className="w-full border-b border-gray-300 flex justify-between"
          >
            <Checkbox
              size="md"
              radius="sm"
              classNames={{
                base: "max-w-full w-full flex items-center hover:bg-gray-100 rounded-lg transition-colors  p-2 m-1",
                label: "w-full text-sm ",
                wrapper: "",
              }}
            >
              {item.label}
            </Checkbox>
            <div className="flex items-center">
              <Button
                variant="light"
                radius="full"
                className="min-w-10 h-10 px-2 "
              >
                <Pencil className="w-4 h-4 text-gray-700" />
              </Button>
              <Button
                variant="light"
                radius="full"
                className="min-w-10 h-10 px-2 text-gray-700 data-[hover=true]:bg-red-500 data-[hover=true]:text-white"
                onPress={() => handleRemove(item.id)}
              >
                <Trash className="w-4 h-4" />
              </Button>
            </div>
          </main>
        ))
      )}
    </>
  );
}
