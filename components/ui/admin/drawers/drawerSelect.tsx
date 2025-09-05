// React
import { useState, useTransition } from "react";

// Componentes
import Input from "../../input";
import Loading from "../loading";

// Bibliotecas
import {
  Ban,
  ChevronLeft,
  CircleFadingPlus,
  Pencil,
  Save,
  Trash,
} from "lucide-react";
import { addToast, Button, Checkbox, Divider } from "@heroui/react";

// Tipagem
import { ItemsAutoComplete } from "@/types/autoComplete";
import { setupApiClient } from "@/utils/api/fetchData";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import React from "react";
interface DrawerSelectProps {
  title: string;
  placeholder: string;
  data: ItemsAutoComplete[];
}

export default function DrawerSelect({
  title,
  placeholder,
  data,
}: DrawerSelectProps) {
  const [name, setName] = useState<string>("");
  const [isOpen, setIsopen] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useTransition();

  const token = Cookies.get("auth_token");
  const api = setupApiClient(token);
  const router = useRouter();

  async function handleForm(e: React.FormEvent) {
    e.preventDefault();

    if (name === "") {
      setError(true);
      addToast({
        title: "Campo obrigatorio",
        description: "Porfavor preenchar todos os campos",
        variant: "flat",
        color: "danger",
      });
    }

    try {
      setError(false);
      await api.post("/categories/", { name });

      setLoading(() => {
        router.refresh();
      });

      addToast({
        title: "A categoria foi adicionada com sucesso!",
        variant: "solid",
        color: "success",
        classNames: {
          title: "text-white",
          description: "text-gray-100",
          icon: "text-white",
        },
      });
    } catch (err) {
      setError(false);

      console.error("Erro ao excluir categoria: ", err);

      addToast({
        title: "Erro no servidor",
        description: "Tente novamente mais tarde.",
        variant: "flat",
        color: "danger",
      });
    }
  }

  async function handleRemove(id: string) {
    try {
      await api.delete(`/categories/${id}`);
      setLoading(() => {
        router.refresh();
      });

      addToast({
        title: "A categoria foi excluída com sucesso",
        variant: "solid",
        color: "success",
        classNames: {
          title: "text-white",
          description: "text-gray-100",
          icon: "text-white",
        },
      });
    } catch (err) {
      addToast({
        title: "Erro no servidor",
        description: "Tente novamente mais tarde.",
        variant: "flat",
        color: "danger",
      });

      console.error("Erro ao excluir categoria: ", err);
    }
  }

  return (
    <>
      <Input placeholder="Buscar categoria" />
      <Divider />
      <Button
        startContent={<CircleFadingPlus className="w-5 h-5" />}
        className={
          isOpen ? "hidden" : "bg-transparent min-w-0 h-7 px-0 text-blue-500"
        }
        onPress={() => setIsopen(!isOpen)}
      >
        <p className="hover:underline underline-offset-1">
          Adicione uma {title}
        </p>
      </Button>
      <div
        className={`transition duration-300 ease-in-out transform ${isOpen ? "w-full border border-gray-200 rounded-lg p-4 opacity-100 translate-y-0" : "opacity-0 -translate-y-2 hidden"}`}
      >
        <form onSubmit={handleForm} className="space-y-2">
          <Input
            label={title}
            placeholder={placeholder}
            isRequired={true}
            value={name}
            errorMessage=""
            error={error}
          />
          <div className="flex space-x-4 items-center">
            <Button
              startContent={<Save className="w-5 h-5" />}
              type="submit"
              radius="sm"
              size="sm"
              className="w-full bg-[#3b82f6] text-gray-200"
            >
              Salvar
            </Button>
            <Button
              startContent={<Ban className="w-5 h-5" />}
              radius="sm"
              size="sm"
              variant="ghost"
              className="w-full text-gray-800 border border-gray-200"
              onPress={() => setIsopen(false)}
            >
              Cancelar
            </Button>
          </div>
        </form>
      </div>
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
