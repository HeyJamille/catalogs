"use client";

// Bibliotecas
import {
  Alert,
  Box,
  Button,
  Container,
  FormControl,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { CiLock, CiMail } from "react-icons/ci";

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
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const { signIn } = useContext(AuthContext);

  async function handleSignIn(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);

    if (!email && !password) {
      setError(true);
      setErrorMsg("Campos de email e senha são obrigatórios");
    }

    await signIn({ email, password });

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
                  fullWidth
                  sx={{
                    height: "3rem",
                    background: "linear-gradient(to right, #155dfc, #1447e6)",
                    color: "#fff",
                    fontWeight: 600,
                    borderRadius: "0.5rem",
                    boxShadow: "0 10px 15px -3px rgba(59, 130, 246, 0.3)",
                    transition: "all 0.2s",
                    "&:hover": {
                      background: "linear-gradient(to right, #1E40AF, #1E3A8A)",
                      boxShadow: "0 15px 25px -5px rgba(59, 130, 246, 0.4)",
                    },
                  }}
                >
                  Entrar
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
        type="error"
        description={errorMsg}
      />
    </div>
  );
}
