// Bibliotecas
import { Alert, Snackbar } from "@mui/material";

// Tipagem
interface ToastifyProps {
  isOpen: boolean;
  description: string;
  type?: "error" | "info" | "success" | "warning";
  close: (value: boolean) => void;
}

export default function Toastify({
  isOpen,
  description,
  type,
  close,
}: ToastifyProps) {
  return (
    <Snackbar
      open={isOpen}
      autoHideDuration={6000}
      onClose={() => close(false)}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
    >
      <Alert
        onClose={() => close(false)}
        severity={type}
        variant="filled"
        sx={{ width: "100%", borderRadius: "8px" }}
      >
        {description}
      </Alert>
    </Snackbar>
  );
}
