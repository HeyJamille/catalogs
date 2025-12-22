"use client";

// Next
import { useRouter } from "next/navigation";

// Utils
import { setupApiClient } from "@/utils/api";

// Context
import { createContext, ReactNode, useEffect, useState } from "react";

// Bibliotecas
import Cookies from "js-cookie";
import { useTopLoader } from "nextjs-toploader";

// Tipagem
import { itemUsers } from "@/types/users";
import Toastify from "@/components/ui/admin/toastify";

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

  async function signIn({ email, password }: SignInProps): Promise<string> {
    try {
      const api = setupApiClient({});
      const resp = await api.post("/users/signin", { email, password });

      if (resp.status === 200 || resp.status === 201) {
        setUser(resp.data.user && resp.data.user);
        resp.data.token && Cookies.set("auth_token", resp.data.token);
        resp.data.user.rules && Cookies.set("user_rule", resp.data.user.rules);
        resp.data.user.enterprise.session_id &&
          Cookies.set("session_id", resp.data.user.enterprise.session_id);

        api.defaults.headers["Authorization"] = `Bearer ${resp.data.token}`;

        const routeByRule: Record<string, string> = {
          Admin: "/chat",
          Dono: "/chat",
          Support: "/chat",
        };

        loader.start();
        resp.data.user && router.push(routeByRule[resp.data.user.rules]);

        return "Login realizado com sucesso!";
      } else {
        return resp.data.message;
      }
    } catch (err) {
      console.log("Error de logar: ", err);
      // Retorna mensagem de erro
      throw new Error("Erro ao realizar login. Verifique suas credenciais.");
    }
  }

  async function signOut() {
    Cookies.remove("auth_token");
    Cookies.remove("user_rule");
    Cookies.remove("session_id");

    setUser(undefined);

    router.push("/signin");
  }

  useEffect(() => {
    const token = Cookies.get("auth_token");

    async function loadUser() {
      if (token) {
        try {
          const api = setupApiClient({ token });

          const resp = await api.get("/users/me");

          setUser(resp.data.user);
        } catch (err) {
          console.log("Erro ao validar token:", err);

          signOut();
        }
      }
    }

    loadUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AuthContext.Provider value={{ user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}
