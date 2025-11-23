// Bibliotecas
import Cookies from "js-cookie";
import { setupApiClient } from "../api/fetchData";
import { addToast } from "@heroui/react";

// Next
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

// Tipagem
interface HandleRemoveProps {
  endpoint: string;
  router: AppRouterInstance;
  setLoading: React.TransitionStartFunction;
}

export async function handleRemove({
  endpoint,
  router,
  setLoading,
}: HandleRemoveProps) {
  const token = Cookies.get("auth_token");
  const api = setupApiClient({ token });

  try {
    await api.delete(endpoint);
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
