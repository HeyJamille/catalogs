"use client";

// Bibliotecas
import { Alert as AlertUI, useTheme } from "@mui/material";

// Tipagem
interface AlertProps {
  description: string;
  error?: "success" | "warning" | "error" | "info";
}

export default function Alert({ description, error }: AlertProps) {
  const theme = useTheme();

  return (
    <AlertUI
      severity={error ?? "info"}
      variant="outlined"
      className="items-center text-gray-100"
      sx={{
        display: "flex",
        alignItems: "center",
        borderColor: error === "error" ? theme.palette.error.main : "divider",
        borderRadius: "8px",
        color: "#6a7282",
        "& .MuiAlert-icon": {
          display: "flex",
          justifyContent: "center",
          color: error === "error" ? theme.palette.error.main : "#6a7282",
          fontSize: "2em",
        },
      }}
    >
      <p className={`${error === "error" ? "text-red-500" : ""}`}>
        {description}
      </p>
    </AlertUI>
  );
}
