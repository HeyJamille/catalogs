"use client";

// React
import { useContext, useState } from "react";

// Componentes
import { Button } from "@heroui/button";

// Bibliotecas
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Input } from "@heroui/react";

// Provider
import { AuthContext } from "@/provider/auth";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [menssageErro, setMenssageErro] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState(false);

  const { signIn } = useContext(AuthContext);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);

    const resp = await signIn({ email, password });
    setEmail("");
    setPassword("");
    setMenssageErro(resp);

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-blue-50 via-white to-blue-50 flex items-center justify-center px-4 py-8">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-lg p-10">
        <h2 className="text-4xl font-extrabold text-center text-blue-700 mb-6">
          Bem-vindo!
        </h2>
        <p className="text-center text-gray-600 mb-8 text-lg">
          Faça login para acessar sua conta
        </p>

        <form onSubmit={handleLogin} className="space-y-3">
          <div>
            <Input
              label="Email"
              required={true}
              variant="bordered"
              labelPlacement="outside-top"
              placeholder="exemplo@domain.com.br"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              classNames={{
                inputWrapper: `border-small ${menssageErro ? "border-red-600" : "border-gray-600"}  data-[hover=true]:border-default-400 group-data-[focus=true]:border-default-foreground`,
              }}
            />
          </div>

          <div>
            <Input
              label="Senha"
              required={true}
              variant="bordered"
              labelPlacement="outside-top"
              placeholder="••••••••••••••••••••••••"
              type={showPassword ? "text" : "password"}
              onChange={(e) => setPassword(e.target.value)}
              classNames={{
                inputWrapper: `border-small ${menssageErro ? "border-red-600" : "border-gray-600"}  data-[hover=true]:border-default-400 group-data-[focus=true]:border-default-foreground`,
              }}
              endContent={
                <button
                  aria-label="toggle password visibility"
                  className="focus:outline-solid outline-transparent"
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <AiOutlineEye size={24} />
                  ) : (
                    <AiOutlineEyeInvisible size={24} />
                  )}
                </button>
              }
            />
          </div>

          <p className="text-end text-sm text-gray-500">
            Esqueceu sua senha?{" "}
            <a href="#" className="text-blue-600 hover:underline font-medium">
              Recuperar
            </a>
          </p>

          {menssageErro && (
            <p className="text-center text-red-600 font-semibold text-sm">
              {menssageErro}
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
      </div>
    </div>
  );
}
