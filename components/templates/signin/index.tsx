"use client";

// Bibliotecas
import {
  Box,
  Button,
  Container,
  FormControl,
  InputAdornment,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { CiLock, CiMail } from "react-icons/ci";

// React
import { useState } from "react";

export default function SignIn() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassoword] = useState<string>("");
  const [error, setError] = useState<boolean>(false);
  const [emailError, setEmailError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  function handleSignIn(e: React.FormEvent) {
    e.preventDefault();
  }

  function handleValidateFields() {
    if (!email && !password) {
      setError(true);
    }
    // if (!email || !/\S+@\S+\.\S+/.test(email)) {
    //   setError(true);
    //   // setEmailError("Por favor, insira um endereço de e-mail válido.");

    //   addToast({
    //     title: "Campo obrigatório",
    //     description: "Por favor, insira um endereço de e-mail válido.",
    //     variant: "solid",
    //     color: "danger",
    //     classNames: {
    //       title: "text-white",
    //       description: "text-gray-100",
    //       icon: "text-white",
    //     },
    //   });
    // } else if (!password || password.length < 8) {
    //   setError(true);
    //   setPasswordError("A senha deve ter no mínimo 8 caracteres.");
    // }
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
                <TextField
                  id="email"
                  name="email"
                  label="Email"
                  type="email"
                  size="small"
                  placeholder="seuemail@gmail.com"
                  error={error}
                  helperText={emailError && emailError}
                  fullWidth
                  variant="outlined"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <CiMail className="w-5 h-5" />
                      </InputAdornment>
                    ),
                    sx: {
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderRadius: "8px",
                      },
                    },
                  }}
                />
                <TextField
                  id="password"
                  name="password"
                  label="Senha"
                  type="password"
                  size="small"
                  placeholder="sua senha"
                  error={error}
                  // helperText="Incorrect entry."

                  fullWidth
                  variant="outlined"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <CiLock className="w-5 h-5" />
                      </InputAdornment>
                    ),
                    sx: {
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderRadius: "8px",
                      },
                    },
                  }}
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
                  onClick={handleValidateFields}
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
    </div>
  );
}
