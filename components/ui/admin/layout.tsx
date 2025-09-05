"use client";

// React
import { ReactNode } from "react";

// Bibliotecas
import { Provider, useAtom } from "jotai";

// Atom
import { isMenuOpenAtom } from "@/atom/isMenuOpen";

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
  const [isOpen, setIsOpen] = useAtom<boolean>(isMenuOpenAtom);

  return (
    <main className="w-full flex overflow-hidden">
      <SideNav isOpen={isOpen} />
      <main className="w-full p-4 h-screen overflow-auto">
        <HeaderNav
          isClose={() => setIsOpen(!isOpen)}
          isOpen={isOpen}
          companysData={companysData}
        />
        <main className="w-full py-6 px-5">
          <Provider>{children}</Provider>
        </main>
      </main>
    </main>
  );
}
