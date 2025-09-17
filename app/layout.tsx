// React
import React from "react";

// Styles
import "@/styles/globals.css";

// Providers
import { AuthProvider } from "@/provider/auth";

// Bibliotecas
import NextTopLoader from "nextjs-toploader";
import { ToastProvider } from "@heroui/react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>
        <AuthProvider>
          <NextTopLoader color="#155dfc" />
          <main className="min-h-screen bg-[#f1f5f9]">{children} </main>
        </AuthProvider>
      </body>
    </html>
  );
}
