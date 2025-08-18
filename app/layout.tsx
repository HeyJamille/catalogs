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
          <main className="min-h-screen bg-gray-50">{children} </main>
        </AuthProvider>
      </body>
    </html>
  );
}
