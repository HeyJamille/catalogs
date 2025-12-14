"use client";

// Componentes
import HeaderNav from "@/components/ui/admin/headerNav";
import SideNav from "@/components/ui/admin/sidenav";

// React
import { ReactNode, useState } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <main className="w-full flex flex-col h-full">
      <HeaderNav isOpen={menuOpen} setMenu={setMenuOpen} />
      <div className="flex space-x-18 ">
        <SideNav isOpen={menuOpen} setMenu={setMenuOpen} />
        <main className="w-full flex pb-20">{children}</main>
      </div>
    </main>
  );
}
