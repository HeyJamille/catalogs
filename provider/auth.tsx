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
import { itemUsers } from "../types/users/index";

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
  const api = setupApiClient();

  async function signIn({ email, password }: SignInProps) {
    try {
      const resp = await api.post("/users/signin", { email, password });

      const user = resp.data.user;
      const token = resp.data.token;

      Cookies.set("auth_token", token);
      Cookies.set("user_rule", user.rule.name);

      setUser(user);
      api.defaults.headers["Authorization"] = `Bearer ${token}`;

      const routeByRule: Record<string, string> = {
        Admin: "/dashboard",
        Dono: "/dashboard",
        "Suporte do Sistema": "/dashboard",
        cliente: "/catalogo",
        Estoque: "/estoque",
      };

      router.push(routeByRule[user.rule.name]);
    } catch (err: any) {
      // Aviso de error

      return err.response.data.message;
    }
  }

  async function signOut() {
    Cookies.remove("auth_token");
    setUser(undefined);
    router.push("/signin");
  }

  useEffect(() => {
    const token = Cookies.get("auth_token");
    async function loadUser() {
      if (token) {
        try {
          const api = setupApiClient(token);

          const resp = await api.post("/users/me");
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
