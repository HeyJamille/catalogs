// Bibliotecas
import { IconButton, Tooltip } from "@mui/material";

// Tipagem
interface ButtonIconssProps {
  title: string;
  icon: React.ReactNode;
}

export default function ButtonIcon({ title, icon }: ButtonIconssProps) {
  return (
    <Tooltip title={title}>
      <IconButton
        sx={{
          border: "1px solid",
          borderColor: "grey.400",
          borderRadius: "8px",
          color: "grey.700",
          "&:hover": {
            backgroundColor: "grey.100",
            borderColor: "grey.600",
          },
        }}
      >
        {icon}
      </IconButton>
    </Tooltip>
  );
}
