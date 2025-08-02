"use client";

import { useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { Button, ButtonGroup } from "@heroui/button";

// icons
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { login } from "../../services/authService";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  // states for "invalid field" control
  const [touched, setTouched] = useState({
    email: false,
    senha: false,
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Exchanged marked
    setTouched({
      email: true,
      senha: true,
    });

    // Check if any field is empty
    if (!email || !senha) {
      setErro("Preencha todos os campos.");
      setLoading(false);
      return;
    }

    try {
      await new Promise((r) => setTimeout(r, 2000));

      const res = await login(email, senha);
      Cookies.set("auth_token", res.token);

      const regra = res.user?.rule;

      if (!regra || !regra.name) {
        throw new Error("Regra do usuário não encontrada.");
      }

      if (regra.name.toLowerCase() === "cliente") {
        router.push("/dashboard");
      } else {
        router.push("/admin");
      }
    } catch (err) {
      setErro("E-mail ou senha inválidos");
    } finally {
      setLoading(false);
    }
  };

  // red border
  const inputClass = (field: keyof typeof touched) =>
    touched[field] && !eval(field)
      ? "w-full px-5 py-3 border border-red-400 rounded-xl shadow-sm focus:outline-none focus:ring-3 focus:ring-red-400 transition"
      : "w-full px-5 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-3 focus:ring-blue-400 transition";

  return (
    <div className="min-h-screen bg-gradient-to-tr from-blue-50 via-white to-blue-50 flex items-center justify-center px-4 py-12">
      {/* Barra de carregamento no topo */}
      {loading && (
        <div className="fixed top-0 left-0 w-full h-1 bg-blue-600 animate-[loadingBar_2s_linear_infinite]"></div>
      )}

      <style>
        {`
          @keyframes loadingBar {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
          }
        `}
      </style>

      <div className="max-w-md w-full bg-white rounded-3xl shadow-lg p-10">
        <h2 className="text-4xl font-extrabold text-center text-blue-700 mb-6">
          Bem-vindo!
        </h2>
        <p className="text-center text-gray-600 mb-8 text-lg">
          Faça login para acessar sua conta
        </p>

        <form onSubmit={handleLogin} className="space-y-6" noValidate>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-gray-700 mb-1"
            >
              E-mail
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={() => setTouched({ ...touched, email: true })}
              required
              placeholder="exemplo@dominio.com"
              className={`w-full px-5 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-3 focus:ring-blue-400 transition ${inputClass("email")}`}
            />
          </div>

          <div>
            <label
              htmlFor="senha"
              className="block text-sm font-semibold text-gray-700 mb-1"
            >
              Senha
            </label>
            <div className="relative">
              <input
                id="senha"
                type={showPassword ? "text" : "password"}
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                onBlur={() => setTouched({ ...touched, senha: true })}
                required
                placeholder="••••••••"
                className={`w-full px-5 py-3 border rounded-xl shadow-sm focus:outline-none focus:ring-3 transition ${inputClass("senha")}`}
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-blue-600 focus:outline-none"
                onClick={() => setShowPassword(!showPassword)}
                tabIndex={-1}
                aria-label={showPassword ? "Esconder senha" : "Mostrar senha"}
              >
                {showPassword ? (
                  <AiOutlineEyeInvisible size={24} />
                ) : (
                  <AiOutlineEye size={24} />
                )}
              </button>
            </div>
          </div>

          <p className="text-end text-sm text-gray-500">
            Esqueceu sua senha?{" "}
            <a href="#" className="text-blue-600 hover:underline font-medium">
              Recuperar
            </a>
          </p>

          {erro && (
            <p className="text-center text-red-600 font-semibold text-sm">
              {erro}
            </p>
          )}

          <Button
            type="submit"
            isLoading={loading}
            color="primary"
            className="w-full"
          >
            {loading ? "Carregando" : "Entrar"}
          </Button>
        </form>
        {/* Barra de carregamento no topo 
        <p className="mt-6 text-center text-gray-600 text-sm">
          Não tem uma conta?{" "}
          <a href="/signout" className="text-blue-600 font-semibold hover:underline">
            Cadastre-se
          </a>
        </p>
        */}
      </div>
    </div>
  );
}
