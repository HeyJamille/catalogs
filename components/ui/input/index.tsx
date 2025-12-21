// Bibliotecas
import { TextField, TextFieldProps, InputAdornment } from "@mui/material";

// Tipagem
interface Props extends Omit<TextFieldProps, "onChange"> {
  icon?: React.ReactNode;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Input({
  icon,
  value,
  onChange,
  error,
  helperText,
  ...rest
}: Props) {
  return (
    <TextField
      {...rest}
      value={value}
      onChange={onChange}
      error={error}
      helperText={helperText}
      size="small"
      fullWidth
      variant="outlined"
      InputProps={{
        startAdornment: icon ? (
          <InputAdornment position="start">{icon}</InputAdornment>
        ) : undefined,
        sx: {
          "& .MuiOutlinedInput-notchedOutline": {
            borderRadius: "8px",
          },
        },
      }}
    />
  );
}
