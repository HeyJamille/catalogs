"use client";

import { useState } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from "next/navigation";
import { register } from '@/services/authService';

// icons
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

export default function RegisterPage() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [telefone, setTelefone] = useState('');
  const [cep, setCep] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [erro, setErro] = useState('');

  // states for "invalid field" control
  const [touched, setTouched] = useState({
    nome: false,
    email: false,
    senha: false,
    confirmarSenha: false,
    telefone: false,
    cep: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    // Exchanged marked
    setTouched({
      nome: true,
      email: true,
      senha: true,
      confirmarSenha: true,
      telefone: true,
      cep: true,
    });

    // Check if any field is empty
    if (!nome || !email || !senha || !confirmarSenha || !telefone || !cep) {
      setErro("Preencha todos os campos.");
      return;
    }

    // Check if passwords match
    if (senha !== confirmarSenha) {
      setErro("As senhas não coincidem.");
      return;
    }

    try {
      const res = await register(nome, email, senha);

      alert("Cadastro realizado com sucesso!");
      router.push('/'); 
    } catch (err) {
      setErro("Erro ao registrar. Tente novamente.");
    }
  };

  // red border
  const inputClass = (field: keyof typeof touched) =>
    touched[field] && !eval(field) 
      ? "w-full px-5 py-3 border border-red-400 rounded-xl shadow-sm focus:outline-none focus:ring-3 focus:ring-red-400 transition"
      : "w-full px-5 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-3 focus:ring-blue-400 transition";

  return (
    <div className="min-h-screen bg-gradient-to-tr from-blue-50 via-white to-blue-50 flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-lg p-10">
        <h2 className="text-4xl font-extrabold text-center text-blue-700 mb-6">Crie sua conta</h2>
        <p className="text-center text-gray-600 mb-8 text-lg">
          Preencha os campos abaixo para se cadastrar
        </p>

        <form onSubmit={handleRegister} className="space-y-6" noValidate>
          <div>
            <label htmlFor="nome" className="block text-sm font-semibold text-gray-700 mb-1">
              Nome completo
            </label>
            <input
              id="nome"
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              onBlur={() => setTouched({ ...touched, nome: true })}
              required
              placeholder="Seu nome completo"
              className={inputClass("nome")}
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-1">
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
              className={inputClass("email")}
            />
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label htmlFor="senha" className="block text-sm font-semibold text-gray-700 mb-1">
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
                  className={inputClass("senha")}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-blue-600 focus:outline-none"
                  onClick={() => setShowPassword(!showPassword)}
                  tabIndex={-1}
                  aria-label={showPassword ? "Esconder senha" : "Mostrar senha"}
                >
                  {showPassword ? <AiOutlineEyeInvisible size={24} /> : <AiOutlineEye size={24} />}
                </button>
              </div>
            </div>

            <div>
              <label htmlFor="confirmarSenha" className="block text-sm font-semibold text-gray-700 mb-1">
                Confirmar Senha
              </label>
              <div className="relative">
                <input
                  id="confirmarSenha"
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmarSenha}
                  onChange={(e) => setConfirmarSenha(e.target.value)}
                  onBlur={() => setTouched({ ...touched, confirmarSenha: true })}
                  required
                  placeholder="••••••••"
                  className={inputClass("confirmarSenha")}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-blue-600 focus:outline-none"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  tabIndex={-1}
                  aria-label={showConfirmPassword ? "Esconder senha" : "Mostrar senha"}
                >
                  {showConfirmPassword ? <AiOutlineEyeInvisible size={24} /> : <AiOutlineEye size={24} />}
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label htmlFor="telefone" className="block text-sm font-semibold text-gray-700 mb-1">
                Telefone
              </label>
              <input
                id="telefone"
                type="tel"
                value={telefone}
                onChange={(e) => setTelefone(e.target.value)}
                onBlur={() => setTouched({ ...touched, telefone: true })}
                required
                placeholder="(99) 99999-9999"
                className={inputClass("telefone")}
              />
            </div>

            <div>
              <label htmlFor="cep" className="block text-sm font-semibold text-gray-700 mb-1">
                CEP
              </label>
              <input
                id="cep"
                type="text"
                value={cep}
                onChange={(e) => setCep(e.target.value)}
                onBlur={() => setTouched({ ...touched, cep: true })}
                required
                placeholder="00000-000"
                className={inputClass("cep")}
              />
            </div>
          </div>

          {erro && (
            <p className="text-center text-red-600 font-semibold text-sm">{erro}</p>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-2xl shadow-lg transition duration-300"
          >
            Cadastrar
          </button>
        </form>

        <p className="mt-6 text-center text-gray-600 text-sm">
          Já tem uma conta?{" "}
          <a href="/" className="text-blue-600 font-semibold hover:underline">
            Entrar
          </a>
        </p>
      </div>
    </div>
  );
}
