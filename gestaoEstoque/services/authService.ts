// src/services/authService.ts
type LoginResponse = {
	ok: any;
  token: string;
  user: {
    rule: {
      toLowerCase(): unknown;
      name: string; // <-- Aqui estava o erro
    };
    id: number;
    name: string;
    email: string;
  };
};

export async function login(email: string, password: string): Promise<LoginResponse> {
  const res = await fetch("https://catalogsapi.vercel.app/v1/users/signin", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    throw new Error("Credenciais inválidas");
  }
  
  return await res.json();
}

export async function register(name: string, email: string, password: string): Promise<LoginResponse> {
  const res = await fetch("https://catalogsapi.vercel.app/v1/users/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, password }),
  });

  if (!res.ok) {
    throw new Error("Erro no cadastro");
  }

  return await res.json();
}

