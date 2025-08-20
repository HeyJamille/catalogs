"use client";

// Next
import Image from "next/image";

// Imagens
import slogan from "@/public/assets/slogan.png";

// Dados
import { data } from "@/data/settings/settingsMenu";

// Bibliotecas
import { Button } from "@heroui/button";
import {
  ChevronDown,
  ChevronUp,
  FolderClosed,
  FolderSymlinkIcon,
  Lightbulb,
  MessageCircle,
} from "lucide-react";

// React
import { useState } from "react";

// Componentes
import UserDropdown from "@/components/ui/userDropdown";
import ActiveSide from "./activeSide";

export default function SideNav() {
  const [openMenus, setOpenMenus] = useState<Set<string>>(new Set());

  const toggleMenu = (label: string) => {
    setOpenMenus((prev) => {
      const newMenus = new Set(prev);
      if (newMenus.has(label)) {
        newMenus.delete(label);
      } else {
        newMenus.add(label);
      }
      return newMenus;
    });
  };

  return (
    <aside className="bg-[#3b82f6] dark:bg-gray-900 border-r border-gray-200 rounded-r-lg w-72 h-screen flex flex-col">
      <div className="flex items-center p-6 space-x-4">
        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg flex items-center justify-center">
          <Image src={slogan} alt="Slogan" className="-scale-x-100" />
        </div>
        <h1 className="text-2xl font-extrabold text-white">Cataloguês</h1>
      </div>

      <div className="border-b border-gray-200 mx-2"></div>

      <nav className="flex-1 px-3 pt-4 space-y-2">
        <h3 className="mb-4 text-xs leading-[20px] text-gray-300 font-bold uppercase">
          Menu
        </h3>

        {data.map((item, index) => (
          <div key={index} className="space-y-1">
            <Button
              startContent={
                <div className="w-full flex items-center">
                  <FolderClosed className="w-5 h-5 mr-3" />
                  <span className="font-semibold text">{item.label}</span>
                </div>
              }
              endContent={
                openMenus.has(item.label) ? (
                  <ChevronUp className="w-4 h-4 mr-3" />
                ) : (
                  <ChevronDown className="w-4 h-4 mr-3" />
                )
              }
              onClick={() => toggleMenu(item.label)}
              className="flex items-center bg-gray-100 w-full px-3 py-2 rounded-lg text-blue-900 transition"
            />
            {openMenus.has(item.label) && (
              <div className="pl-8 space-y-1">
                {item.subItems.map((subItem) => (
                  <ActiveSide
                    href={subItem.href}
                    icon={<subItem.icon className="w-5 h-5 mr-2" />}
                  >
                    {subItem.label}
                  </ActiveSide>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>
      <nav className="flex-4 px-3 pt-4 space-y-2">
        <h3 className="mb-4 text-xs leading-[20px] text-gray-300 font-bold uppercase">
          Suporte
        </h3>

        <div className="space-y-1">
          <div className="">
            <ActiveSide
              href="/overview"
              icon={<MessageCircle className="w-4 h-4 mr-2 font-semibold" />}
            >
              Chat do suporte
            </ActiveSide>
            <ActiveSide
              href="/stats"
              icon={<Lightbulb className="w-4 h-4 mr-2 font-semibold" />}
            >
              Sugestão
            </ActiveSide>
          </div>
        </div>
      </nav>

      <div className="border-b border-gray-200 mx-2"></div>

      <div className="p-2 w-full">
        <UserDropdown />
      </div>
    </aside>
  );
}
