// Bibliotecas
import { IconButton, Tooltip } from "@mui/material";
import { AiOutlineLoading } from "react-icons/ai";

// Tipagem
interface ButtonIconssProps {
  title: string;
  icon: React.ReactNode;
  loading?: boolean;
  handleAction?: () => void;
}

export default function ButtonIcon({
  title,
  icon,
  loading,
  handleAction,
}: ButtonIconssProps) {
  return (
    <Tooltip title={title} arrow>
      <IconButton
        onClick={handleAction}
        loading={loading}
        disabled={loading}
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
        {loading ? <AiOutlineLoading className="w-5 h-5" /> : icon}
      </IconButton>
    </Tooltip>
  );
}
