"use client";

import { useEffect, useState } from "react";
import Cookies from "js-cookie";

export default function AdminPage() {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const t = Cookies.get("auth_token");
    setToken(t || null);
  }, []);

  if (!token) {
    return <p>Você não está logado. <a href="/signin">Voltar</a></p>;
  }

  return <h1>Bem-vindo à área administrativa</h1>;
}
