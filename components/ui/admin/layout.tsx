"use client";

// React
import { ReactNode, useState } from "react";

// Bibliotecas
import { Provider } from "jotai";

// Components
import HeaderNav from "@/components/menu/admin/headerNav";
import SideNav from "@/components/menu/admin/sideNav";

// Tipagem
import { enterpriseItems } from "@/types/enterprise";
interface LayoutProps {
  children: ReactNode;
  companysData: enterpriseItems[];
}

export default function Layout({ companysData, children }: LayoutProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <main className="w-full flex overflow-hidden">
      <SideNav isOpen={isOpen} />
      <main className="w-full p-4 h-screen overflow-hidden">
        <HeaderNav
          isClose={() => setIsOpen(!isOpen)}
          isOpen={isOpen}
          companysData={companysData}
        />
        <div className="py-6 px-5">
          <main className="w-full overflow-auto h-full">
            <Provider>{children}</Provider>
          </main>
        </div>
      </main>
    </main>
  );
}
