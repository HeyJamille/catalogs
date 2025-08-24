// React
import React from "react";

// Styles
import "@/styles/globals.css";

// Providers
import { AuthProvider } from "@/provider/auth";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>
        <AuthProvider>
          <main className="min-h-screen bg-[#f1f5f9]">{children} </main>
        </AuthProvider>
      </body>
    </html>
  );
}
