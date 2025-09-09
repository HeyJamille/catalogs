// React
import React from "react";

// Bibliotecas
import Cookies from "js-cookie";
import { setupApiClient } from "../api/fetchData";

// Tipagem
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { addToast } from "@heroui/react";
interface HandleFormProps {
  endpoint: string;
  router: AppRouterInstance;
  data?: object;
  isEdit?: boolean;
  setLoading?: React.TransitionStartFunction;
}

export async function handleForm({
  endpoint,
  router,
  data,
  isEdit,
  setLoading,
}: HandleFormProps) {
  const token = Cookies.get("auth_token");
  const api = setupApiClient(token);

  try {
    const resp = isEdit
      ? await api.patch(endpoint, data)
      : await api.post(endpoint, data);

    setLoading &&
      setLoading(() => {
        router.refresh();
      });

    if (resp.status === 201 || resp.status === 200) {
      addToast({
        title: `${(resp as any).data.msg}`,
        variant: "solid",
        color: "success",
        classNames: {
          title: "text-white",
          description: "text-gray-100",
          icon: "text-white",
        },
      });
    }
  } catch (err) {
    console.log("Erro: ", err);

    if ((err as any).status === 400) {
      addToast({
        title: "Erro ao salvar",
        description: `${(err as any).response.data.message}`,
        variant: "solid",
        color: "danger",
        classNames: {
          title: "text-white",
          description: "text-gray-100",
          icon: "text-white",
        },
      });
    }
    if ((err as any).status === 404) {
      addToast({
        title: "Erro ao salvar",
        description: `${(err as any).response.data.message}`,
        variant: "solid",
        color: "danger",
        classNames: {
          title: "text-white",
          description: "text-gray-100",
          icon: "text-white",
        },
      });
    } else {
      addToast({
        title: "Erro no servidor",
        description: "Tente novamente mais tarde.",
        variant: "flat",
        color: "danger",
      });
    }
  }
}
