"use client";

// React
import { ReactNode, useState } from "react";

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
    <main className="w-full flex">
      <SideNav isOpen={isOpen} />
      <main className="w-full p-4 ">
        <HeaderNav
          isClose={() => setIsOpen(!isOpen)}
          isOpen={isOpen}
          companysData={companysData}
        />
        {children}
      </main>
    </main>
  );
}
