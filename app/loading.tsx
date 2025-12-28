import React from "react";
import { Box, Typography, CircularProgress } from "@mui/material";

export default function Loading() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 4,
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        textAlign: "center",
      }}
    >
      <CircularProgress size={64} />

      <Box>
        <Typography variant="h6" color="text.primary">
          Por gentileza, aguarde...
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Estamos carregando as informações.
        </Typography>
      </Box>

      <Box sx={{ display: "flex", gap: 1 }}>
        <Box
          sx={{
            width: 8,
            height: 8,
            bgcolor: "primary.main",
            borderRadius: "50%",
            animation: "bounce 1s infinite",
          }}
        />
        <Box
          sx={{
            width: 8,
            height: 8,
            bgcolor: "primary.main",
            borderRadius: "50%",
            animation: "bounce 1s infinite",
            animationDelay: "0.2s",
          }}
        />
        <Box
          sx={{
            width: 8,
            height: 8,
            bgcolor: "primary.main",
            borderRadius: "50%",
            animation: "bounce 1s infinite",
            animationDelay: "0.1s",
          }}
        />
      </Box>
    </Box>
  );
}
