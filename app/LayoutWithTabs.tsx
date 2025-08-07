import React from "react";

// Styles
import "@/styles/globals.css";

// Providers
import { AppProvider } from "@/provider/App";
import { AuthProvider } from "@/provider/auth";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className="min-h-screen bg-gray-50">
        <AppProvider>
          <AuthProvider>{children}</AuthProvider>
        </AppProvider>
      </body>
    </html>
  );
}
