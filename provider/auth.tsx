"use client";

import { useRouter } from "next/navigation";
import { setupApiClient } from "@/utils/fetchData";
import { createContext, ReactNode, useState } from "react";
import Cookies from "js-cookie";
import { itemUsers } from "../types/users/index";

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
      const resp = await api.post("/users/signin", {
        email,
        password,
      });

      if (!resp) {
        throw new Error("Credenciais inválidas");
      }

      const token = resp.data.token;
      const user = resp.data.user;

      Cookies.set("auth_token", token);

      setUser(user);
      setToken(token);

      api.defaults.headers["Authorization"] = `Bearer ${token}`;

      return { user, token };
    } catch (err) {
      console.log("error: ", err);
      throw err;
    }
  }

  function signOut() {
    Cookies.remove("auth_token");
    setUser(undefined);
    setToken("");
    router.push("/login");
  }

  return (
    <AuthContext.Provider value={{ user, token, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}
