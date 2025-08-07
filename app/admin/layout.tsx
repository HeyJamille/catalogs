"use client";

import { useState } from "react";
import Header from "../../components/header";
import { Products } from "@/components/products/products";
import { Sales } from "@/components/sales/sales";
import AdminPage from "./page";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [activeTab, setActiveTab] = useState("dashboard");

  const renderContent = () => {
    switch (activeTab) {
      case "products":
        return <Products />;
      case "sales":
        return <Sales />;
      case "dashboard":
        return <AdminPage />;
      default:
        return null;
    }
  };

  return (
    <>
      <Header activeTab={activeTab} onTabChange={setActiveTab} />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderContent()}
      </main>
    </>
  );
}
