"use client";

// Next
import { useRouter } from "next/navigation";

// Utils
import { setupApiClient } from "@/utils/api/fetchData";

// Context
import { createContext, ReactNode, useEffect, useState } from "react";

// Bibliotecas
import Cookies from "js-cookie";

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

  async function signIn({ email, password }: SignInProps) {
    try {
      const api = setupApiClient();

      const resp = await api.post("/users/signin", { email, password });

      setUser(resp.data.user);

      Cookies.set("auth_token", resp.data.token);
      Cookies.set("user_rule", resp.data.user.rule.name);

      api.defaults.headers["Authorization"] = `Bearer ${resp.data.token}`;

      const routeByRule: Record<string, string> = {
        Admin: "/dashboard",
        Dono: "/dashboard",
        "Suporte do Sistema": "/dashboard",
        Cliente: "/catalogo",
        Estoque: "/estoque",
      };

      router.push(routeByRule[resp.data.user.rule.name]);
    } catch (err: any) {
      // Aviso de error

      return err.response.data.message;
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
    </AuthContext.Provider>
  );
}
