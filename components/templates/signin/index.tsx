"use client";

// Bibliotecas
import {
  Box,
  Button,
  Container,
  FormControl,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { CiLock, CiMail } from "react-icons/ci";
import { AiOutlineLoading } from "react-icons/ai";

// React
import { useContext, useState } from "react";

// Componentes
import Input from "@/components/ui/input";
import Toastify from "@/components/ui/admin/toastify";

// Provider
import { AuthContext } from "@/provider/authProvider";

export default function FormSignIn() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassoword] = useState<string>("");
  const [error, setError] = useState<boolean>(false);
  const [msg, setMsg] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const { signIn } = useContext(AuthContext);

  async function handleSignIn(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);

    if (!email && !password) {
      setError(true);
      setMsg("Campos de email e senha são obrigatórios");
    }

    const resp = await signIn({ email, password });
    setError(true);
    setMsg(resp);
    setLoading(false);
  }

  return (
    <div className="flex-1 flex items-center justify-center">
      <Container maxWidth="sm">
        <Paper
          elevation={2}
          sx={{
            width: "100%",
            maxWidth: 500,
            mx: "auto",
            borderRadius: 3,
            p: 4,
          }}
        >
          <Box pb={3}>
            <Typography
              variant="h4"
              sx={{
                fontSize: "30px",
                fontWeight: "bold",
                color: "#101828",
                paddingBottom: "2px",
              }}
            >
              Entrar
            </Typography>
            <Typography sx={{ color: "#4a5565" }} variant="body1">
              Entre com suas credenciais para acessar sua conta
            </Typography>
          </Box>
          <form onSubmit={handleSignIn}>
            <FormControl>
              <Stack spacing={3}>
                <Input
                  id="email"
                  name="Email"
                  label="Email"
                  type="email"
                  size="small"
                  placeholder="seuemail@gmail.com"
                  error={error}
                  helperText={emailError && emailError}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  icon={<CiMail className="w-5 h-5" />}
                />
                <Input
                  id="password"
                  name="password"
                  label="Senha"
                  type="password"
                  size="small"
                  placeholder="Sua senha"
                  error={error}
                  helperText={passwordError && passwordError}
                  value={password}
                  onChange={(e) => setPassoword(e.target.value)}
                  icon={<CiLock className="w-5 h-5" />}
                />

                {/* <div className="flex items-center justify-between">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-600">Lembrar-me</span>
                </label>
                <a
                  href="#"
                  className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
                >
                  Esqueceu a senha?
                </a>
              </div> */}

                <Button
                  type="submit"
                  onClick={handleSignIn}
                  disabled={loading}
                  loading={loading}
                  loadingIndicator={
                    <div className="flex items-center justify-center space-x-2">
                      <AiOutlineLoading className="w-5 h-5 text-white animate-spin" />
                      <span className="text-white font-medium">
                        Carregando...
                      </span>
                    </div>
                  }
                  fullWidth
                  sx={{
                    height: "3rem",
                    background: loading
                      ? "rgba(21, 93, 252, 0.7)"
                      : "linear-gradient(to right, #155dfc, #1447e6)",
                    color: "#fff",
                    fontWeight: 700,
                    fontSize: "1rem",
                    borderRadius: "0.75rem",
                    boxShadow: loading
                      ? "0 6px 10px rgba(0,0,0,0.15)"
                      : "0 10px 18px -4px rgba(59, 130, 246, 0.35)",
                    cursor: loading ? "not-allowed" : "pointer",
                    transition: "all 0.25s ease-in-out",
                    "&:hover": {
                      background: loading
                        ? "rgba(21, 93, 252, 0.7)"
                        : "linear-gradient(to right, #1E40AF, #1E3A8A)",
                      boxShadow: loading
                        ? "0 6px 10px rgba(0,0,0,0.15)"
                        : "0 15px 28px -6px rgba(59, 130, 246, 0.45)",
                    },
                    "&:focus": {
                      outline: "2px solid #93c5fd",
                      outlineOffset: "2px",
                    },
                  }}
                >
                  {loading ? "Aguarde..." : "Entrar"}
                </Button>

                <p className="mt-6 text-center text-xs text-gray-500">
                  Ao continuar, você concorda com nossos{" "}
                  <a href="#" className="text-blue-600 hover:underline">
                    Termos de Serviço
                  </a>{" "}
                  e{" "}
                  <a href="#" className="text-blue-600 hover:underline">
                    Política de Privacidade
                  </a>
                </p>
              </Stack>
            </FormControl>
          </form>
        </Paper>
      </Container>
      <Toastify
        isOpen={error}
        close={setError}
        type={msg === "Login realizado com sucesso!" ? "success" : "error"}
        description={msg}
      />
    </div>
  );
}
