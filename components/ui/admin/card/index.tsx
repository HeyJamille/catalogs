// Bibliotecas
import { Box, Button, Card, CardContent, Typography } from "@mui/material";
import Link from "next/link";

// React
import { ReactNode } from "react";
import { BiChevronLeft } from "react-icons/bi";
import { IoMdClose } from "react-icons/io";

// tipagem
interface CardHeaderProps {
  title: string;
  href?: string;
  close?: () => void;
  type: "close" | "back";
}

export function CardContainer({ children }: { children: ReactNode }) {
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

export function CardHeader({ title, close, href, type }: CardHeaderProps) {
  return (
    <Box display="flex" alignItems="center" gap={1}>
      {type === "back" ? (
        <Button
          LinkComponent={Link}
          href={href}
          variant="outlined"
          size="small"
          sx={{
            minWidth: 0,
            p: "7px",
            borderRadius: "50%",
            color: "grey.600",
            borderColor: "grey.300",
            "&:hover": {
              backgroundColor: "grey.100",
              borderColor: "grey.400",
            },
          }}
        >
          <BiChevronLeft className="w-5 h-5" />
        </Button>
      ) : (
        <Button
          variant="outlined"
          onClick={close}
          size="small"
          sx={{
            minWidth: 0,
            p: "7px",
            borderRadius: "50%",
            color: "grey.600",
            borderColor: "grey.300",
            "&:hover": {
              backgroundColor: "grey.100",
              borderColor: "grey.400",
            },
          }}
        >
          <IoMdClose className="w-5 h-5 text-red" />
        </Button>
      )}

      <Typography sx={{ color: "#364153", fontSize: "19px", fontWeight: 600 }}>
        {title}
      </Typography>
    </Box>
  );
}
