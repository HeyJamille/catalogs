"use client";

// Next
import { useRouter } from "next/navigation";

// Utils
import { setupApiClient } from "@/utils/api/fetchData";

// Context
import { createContext, ReactNode, useEffect, useState } from "react";

// Bibliotecas
import Cookies from "js-cookie";
import { addToast, ToastProvider } from "@heroui/react";
import { useTopLoader } from "nextjs-toploader";

// Tipagem
import { itemUsers } from "../types/user";

// Tipagens
type SignInProps = {
  email: string;
  password: string;
};

type AuthContextData = {
  user: itemUsers | undefined;
  signIn: (credentials: SignInProps) => Promise<string>;
  signOut: () => void;
};

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<itemUsers>();

  const router = useRouter();
  const loader = useTopLoader();

  async function signIn({ email, password }: SignInProps) {
    try {
      const api = setupApiClient();

      const resp = await api.post("/users/signin", { email, password });

      if (resp.status === 200 || resp.status === 201) {
        addToast({
          title: "Login realizado com sucesso!",
          description: "Você será redirecionado em instantes.",
          variant: "solid",
          color: "success",
          classNames: {
            title: "text-white",
            description: "text-gray-100",
            icon: "text-white",
          },
        });
      } else if (resp.status == 500) {
        addToast({
          title: "Erro no servidor",
          description: "Tente novamente mais tarde.",
          variant: "flat",
          color: "danger",
        });
      } else {
        addToast({
          title: "Erro ao fazer login",
          description:
            resp.data.message ||
            "Verifique suas credenciais e tente novamente.",
          variant: "flat",
          color: "danger",
        });
      }

      setUser(resp.data.user && resp.data.user);

      resp.data.token && Cookies.set("auth_token", resp.data.token);
      resp.data.user.rule.name &&
        Cookies.set("user_rule", resp.data.user.rule.name);

      api.defaults.headers["Authorization"] = `Bearer ${resp.data.token}`;

      const routeByRule: Record<string, string> = {
        Admin: "/dashboard",
        Dono: "/dashboard",
        "Suporte do Sistema": "/dashboard",
        Cliente: "/catalogo",
        Estoque: "/estoque",
      };

      loader.start();
      resp.data.user && router.push(routeByRule[resp.data.user.rule.name]);
    } catch (err: any) {
      return err;
    }
  }

  async function signOut() {
    Cookies.remove("auth_token");
    Cookies.remove("user_rule");

    setUser(undefined);

    router.push("/signin");
  }

  useEffect(() => {
    const token = Cookies.get("auth_token");

    async function loadUser() {
      if (token) {
        try {
          const api = setupApiClient(token);

          const resp = await api.get("/users/me");

          setUser(resp.data.user);
        } catch (err) {
          console.log("Erro ao validar token:", err);

          signOut();
        }
      }
    }

    loadUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, signIn, signOut }}>
      {children}
      <ToastProvider placement="top-right" toastOffset={20} />
    </AuthContext.Provider>
  );
}
