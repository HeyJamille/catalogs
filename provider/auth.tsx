"use client";

import { useRouter } from "next/navigation";

// Utils
import { setupApiClient } from "@/utils/fetchData";

// Context
import { createContext, ReactNode, useState } from "react";

// Cookie
import Cookies from "js-cookie";

// Types
import { itemUsers } from "../types/users/index";

// Tipagens
type SignInProps = {
  email: string;
  password: string;
};

type SignInResponse = {
  user: itemUsers;
  token: string;
};

type AuthContextData = {
  user: itemUsers | undefined;
  token: string;
  signIn: (credentials: SignInProps) => Promise<SignInResponse>;
  signOut: () => void;
};

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<itemUsers>();
  const [token, setToken] = useState<string>("");

  const api = setupApiClient();
  const router = useRouter();

  async function signIn({
    email,
    password,
  }: SignInProps): Promise<SignInResponse> {
    try {
      const resp = await api.post("/users/signin", { email, password });
      if (!resp) throw new Error("Credenciais inválidas");

      const token = resp.data.token;
      const user = resp.data.user;
      const userRuleName = user.rule.name.toLowerCase();

      Cookies.set("auth_token", token);
      Cookies.set("user_rule", userRuleName);

      setUser(user);
      setToken(token);
      api.defaults.headers["Authorization"] = `Bearer ${token}`;

      // Rule-based redirection
      const routeByRule: Record<string, string> = {
        admin: "/dashboard",
        dono: "/dashboard",
        suportedosistema: "/dashboard",
        cliente: "/catalogo",
        estoque: "/estoque",
      };

      router.push(routeByRule[userRuleName] || "/");

      return { user, token };
    } catch (err) {
      console.log("error: ", err);
      throw err;
    }
  }

  async function signOut() {
    Cookies.remove("auth_token");
    Cookies.remove("user_rule");
    setUser(undefined);
    setToken("");
    router.push("/signin");
  }

  return (
    <AuthContext.Provider value={{ user, token, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}
