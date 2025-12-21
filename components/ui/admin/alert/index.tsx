// Bibliotecas
import { Alert as AlertUI } from "@mui/material";

export default function Alert({ description }: { description: string }) {
  return (
    <AlertUI
      severity="info"
      variant="outlined"
      className="items-center text-gra"
      sx={{
        display: "flex",
        alignItems: "center",
        borderColor: "divider",
        borderRadius: "8px",
        color: "#6a7282",
        "& .MuiAlert-icon": {
          display: "flex",
          justifyContent: "center",
          color: "#6a7282",
          fontSize: "2em",
        },
      }}
    >
      {description}
    </AlertUI>
  );
}
