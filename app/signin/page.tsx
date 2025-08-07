"use client";

import { useContext, useState } from "react";

// Route
import { useRouter } from "next/navigation";

// Icon
import { Button } from "@heroui/button";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

// Provider
import { AuthContext } from "../../provider/auth";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const { signIn } = useContext(AuthContext);

  // states for "invalid field" control
  const [touched, setTouched] = useState({
    email: false,
    password: false,
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTouched({
      email: true,
      password: true,
    });

    // Verificação se os campos foram preenchidos
    if (!email || !password) {
      setErro("Preencha todos os campos.");
      setLoading(false);
      return;
    }

    try {
      const res = await signIn({ email, password });

      if (!res || !res.token) {
        throw new Error("Token não retornado.");
      }

      const regra = res.user?.rule;

      if (!regra || !regra.name) {
        throw new Error("Regra do usuário não encontrada.");
      }

      // Redirecionamento de acordo com a regra
      if (regra.name === "Cliente") {
        router.push("/dashboard");
      } else {
        router.push("/admin");
      }
    } catch (err: any) {
      setErro("E-mail ou senha inválidos");
    } finally {
      setLoading(false);
    }
  };

  const values = { email, password };

  // red border
  const inputClass = (field: keyof typeof touched) =>
    touched[field] && !values[field]
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
              htmlFor="password"
              className="block text-sm font-semibold text-gray-700 mb-1"
            >
              Senha
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onBlur={() => setTouched({ ...touched, password: true })}
                required
                placeholder="••••••••"
                className={`w-full px-5 py-3 border rounded-xl shadow-sm focus:outline-none focus:ring-3 transition ${inputClass("password")}`}
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
