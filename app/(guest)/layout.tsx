// React
import React from "react";

export default function GuestLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main className="min-h-screen bg-gray-50">{children}</main>;
}
