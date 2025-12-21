// Bibliotecas
import { Card, CardContent } from "@mui/material";

// React
import { ReactNode } from "react";

export default function CardContainer({ children }: { children: ReactNode }) {
  return (
    <Card
      sx={{
        width: "100%",
        maxWidth: 590,
        borderRadius: "12px",
        border: 1,
        p: "8px",
        borderColor: "divider",
      }}
    >
      <CardContent>{children}</CardContent>
    </Card>
  );
}
