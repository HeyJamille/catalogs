// Bibliotecas
import { InputAdornment, TextField } from "@mui/material";
import { FiSearch } from "react-icons/fi";

export default function SearchInput() {
  return (
    <TextField
      fullWidth
      placeholder="Pesquisar..."
      size="small"
      sx={{
        py: 1,
        "& .MuiOutlinedInput-root": {
          borderRadius: "24px",
        },
      }}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <FiSearch className="w-5 h-5" />
          </InputAdornment>
        ),
      }}
    />
  );
}
