// React
import { useState, useTransition } from "react";
import React from "react";

// Next
import { useRouter } from "next/navigation";

// Componentes
import Input from "../../input";
import Loading from "../loading";

// Bibliotecas
import {
  Ban,
  CircleFadingPlus,
  Pencil,
  Save,
  Search,
  Trash,
} from "lucide-react";
import { Button, Checkbox, CheckboxGroup, Divider } from "@heroui/react";

// Utils
import { handleRemove } from "@/utils/handle/handleRemove";
import { handleForm } from "@/utils/handle/handleCreate";
import { searchFilter } from "@/utils/filters/searchFilter";

// Tipagem
import { ItemsLabels } from "@/types/labels";
interface DrawerSelectFormProps {
  title: string;
  endpoint: string;
  placeholder: string;
  data: ItemsLabels[];
  value: string[];
  setValue: (value: string[]) => void;
}

export default function DrawerSelectForm({
  title,
  endpoint,
  placeholder,
  data,
  value,
  setValue,
}: DrawerSelectFormProps) {
  const [name, setName] = useState<string>("");
  const [search, setSearch] = useState<string>("");
  const [id, setId] = useState<string>("");
  const [isOpenCreate, setIsOpenCreate] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [refresh, setRefresh] = useTransition();

  const router = useRouter();
  const filterSearch = searchFilter({ data, search });

  async function handleCreateOrEdit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    await handleForm({
      endpoint: id ? `${endpoint}/${id}` : endpoint,
      router,
      data: { name: name },
      isEdit: id ? true : false,
      setLoading: setRefresh,
    });

    setLoading(false);
    setName("");
    setId("");
    setIsOpenCreate(false);
  }

  return (
    <>
      <Input
        placeholder="Buscar categoria"
        startContent={<Search className="w-5 h-5" />}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <Divider />
      <Button
        startContent={<CircleFadingPlus className="w-5 h-5" />}
        className={
          isOpenCreate
            ? "hidden"
            : "bg-transparent min-w-0 h-7 px-0 text-blue-500"
        }
        onPress={() => setIsOpenCreate(!isOpenCreate)}
      >
        <p className="hover:underline underline-offset-1">
          Adicione uma {title}
        </p>
      </Button>
      <div
        className={`transition duration-300 ease-in-out transform ${isOpenCreate ? "w-full border border-gray-200 rounded-lg p-4 opacity-100 translate-y-0" : "opacity-0 -translate-y-2 hidden"}`}
      >
        <form onSubmit={handleCreateOrEdit} className="space-y-2">
          <Input
            label={title}
            placeholder={placeholder}
            isRequired={true}
            value={name}
            onChange={(e) => setName(e.target.value)}
            errorMessage="Campo obrigatório"
          />
          <div className="flex space-x-4 items-center">
            <Button
              startContent={!loading && <Save className="w-5 h-5" />}
              type="submit"
              radius="sm"
              size="sm"
              className="w-full bg-[#3b82f6] text-gray-200"
              isLoading={loading}
            >
              Salvar
            </Button>
            <Button
              startContent={<Ban className="w-5 h-5" />}
              radius="sm"
              size="sm"
              variant="ghost"
              className="w-full text-gray-800 border border-gray-200"
              onPress={() => setIsOpenCreate(false)}
            >
              Cancelar
            </Button>
          </div>
        </form>
      </div>
      <Divider />
      <div className="h-screen overflow-auto">
        {refresh ? (
          <Loading />
        ) : (
          filterSearch.map((item) => (
            <main key={item.id} className="border-b border-gray-300">
              <div className="w-full flex justify-between">
                <CheckboxGroup
                  classNames={{
                    base: "w-full",
                  }}
                  value={value}
                  onChange={(newValue: string[]) => {
                    if (newValue[0] !== value[0]) {
                      setValue([newValue[0]]);
                    }
                  }}
                >
                  <Checkbox
                    size="md"
                    radius="sm"
                    value={item.id}
                    classNames={{
                      base: "max-w-full w-full flex items-center hover:bg-gray-100 rounded-lg transition-colors  p-2 m-1",
                      label: "w-full text-sm ",
                    }}
                    onChange={() => setValue([item.id])}
                  >
                    {item.label}
                  </Checkbox>
                </CheckboxGroup>
                <div
                  className={
                    item.label.toLowerCase() !== "estoque online"
                      ? "flex items-center"
                      : "hidden"
                  }
                >
                  <Button
                    variant="light"
                    radius="full"
                    className="min-w-10 h-10 px-2 "
                    onPress={() => {
                      setId(item.id);
                      setName(item.label);
                    }}
                  >
                    <Pencil className="w-4 h-4 text-gray-700" />
                  </Button>
                  <Button
                    variant="light"
                    radius="full"
                    className="min-w-10 h-10 px-2 text-gray-700 data-[hover=true]:bg-red-500 data-[hover=true]:text-white"
                    onPress={() =>
                      handleRemove({
                        endpoint: `${endpoint}/${item.id}`,
                        router,
                        setLoading: setRefresh,
                      })
                    }
                  >
                    <Trash className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              {item.id === id && (
                <form onSubmit={handleCreateOrEdit} className="space-y-2 pb-3">
                  <Input
                    label={title}
                    placeholder={placeholder}
                    isRequired={true}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    errorMessage="Campo obrigatório"
                  />
                  <div className="flex space-x-4 items-center">
                    <Button
                      startContent={!loading && <Save className="w-5 h-5" />}
                      type="submit"
                      radius="sm"
                      size="sm"
                      className="w-full bg-[#3b82f6] text-gray-200"
                      isLoading={loading}
                    >
                      Salvar
                    </Button>
                    <Button
                      startContent={<Ban className="w-5 h-5" />}
                      radius="sm"
                      size="sm"
                      variant="ghost"
                      className="w-full text-gray-800 border border-gray-200"
                      onPress={() => {
                        setId("");
                        setName("");
                      }}
                    >
                      Cancelar
                    </Button>
                  </div>
                </form>
              )}
            </main>
          ))
        )}
      </div>
    </>
  );
}
