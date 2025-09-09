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
  Lightbulb,
  MessageCircle,
} from "lucide-react";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Tooltip,
} from "@heroui/react";

// React
import { useState } from "react";

// Componentes
import UserDropdown from "@/components/ui/admin/dropdown/userDropdown";
import ActiveSide from "./activeSide";
import AvatarDropDown from "@/components/ui/admin/dropdown/avatarDropDown";

export default function SideNav({ isOpen }: { isOpen: boolean }) {
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
    <aside
      className={`bg-[#3b82f6] dark:bg-gray-900 border-r border-gray-200 rounded-r-lg ${isOpen ? "w-20" : "w-72"} flex flex-col`}
    >
      <div
        className={`flex items-center ${isOpen ? " justify-center p-2" : "p-6 space-x-4"}`}
      >
        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg flex items-center justify-center">
          <Image src={slogan} alt="Slogan" className="-scale-x-100" />
        </div>
        <h1
          className={`text-2xl font-extrabold ${isOpen && "hidden"} text-white`}
        >
          Cataloguês
        </h1>
      </div>

      <div className="border-b border-gray-200 mx-2"></div>

      <nav
        className={`flex-1 ${isOpen ? "flex-col flex items-center" : "px-3 space-y-2"} pt-4`}
      >
        <h3
          className={`mb-4 text-xs ${isOpen && "text-center"} leading-[20px] text-gray-300 font-bold uppercase`}
        >
          Menu
        </h3>

        {!isOpen &&
          data.map((item, index) => (
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
                onPress={() => toggleMenu(item.label)}
                className="flex items-center bg-gray-100 w-full px-3 py-2 rounded-lg text-blue-900 transition"
              />
              {openMenus.has(item.label) && (
                <div className="pl-6 space-y-1">
                  {item.subItems.map((subItem, index) => {
                    return (
                      <ActiveSide
                        key={index}
                        href={subItem.href}
                        icon={<subItem.icon className="w-5 h-5 mr-2" />}
                      >
                        {subItem.label}
                      </ActiveSide>
                    );
                  })}
                </div>
              )}
            </div>
          ))}
        <div className={`${!isOpen && "hidden"}`}>
          {data.map((item, index) => (
            <main key={index} className="pb-1">
              <Tooltip
                content={item.label}
                showArrow
                placement="right-end"
                radius="sm"
              >
                <div>
                  <Dropdown showArrow radius="sm" placement="right-start">
                    <DropdownTrigger>
                      <Button className="flex items-center bg-gray-100 rounded-lg min-w-14 text-blue-900 transition">
                        <item.icon className="w-5 h-5" />
                      </Button>
                    </DropdownTrigger>
                    <DropdownMenu aria-label="Link Actions">
                      {item.subItems.map((subItem, index) => (
                        <DropdownItem
                          startContent={
                            <subItem.icon className="w-5 h-5 mr-2" />
                          }
                          as="a"
                          key={index}
                          href={subItem.href}
                        >
                          {subItem.label}
                        </DropdownItem>
                      ))}
                    </DropdownMenu>
                  </Dropdown>
                </div>
              </Tooltip>
            </main>
          ))}
        </div>
      </nav>
      <nav className="flex-4 px-3 pt-4 space-y-2">
        <h3 className="mb-4 text-xs leading-[20px] text-gray-300 font-bold uppercase">
          Suporte
        </h3>

        <div className="space-y-1">
          <Tooltip
            content="Chat do suporte"
            showArrow
            placement="right-end"
            radius="sm"
          >
            <div>
              <ActiveSide
                href="/overview"
                isMenu={isOpen}
                icon={
                  !isOpen && (
                    <MessageCircle className="w-4 h-4 mr-2 font-semibold" />
                  )
                }
              >
                {isOpen ? (
                  <MessageCircle className="w-5 h-5 font-semibold" />
                ) : (
                  "Chat do suporte"
                )}
              </ActiveSide>
            </div>
          </Tooltip>
          <Tooltip
            content="Sugestão"
            showArrow
            placement="right-end"
            radius="sm"
          >
            <div>
              <ActiveSide
                href="/stats"
                isMenu={isOpen}
                icon={
                  !isOpen && (
                    <Lightbulb className="w-4 h-4 mr-2 font-semibold" />
                  )
                }
              >
                {isOpen ? (
                  <Lightbulb className="w-5 h-5 font-semibold" />
                ) : (
                  "Sugestão"
                )}
              </ActiveSide>
            </div>
          </Tooltip>
        </div>
      </nav>

      <div className="border-b border-gray-200 mx-2"></div>

      <div className="p-2 w-full flex items-center justify-center">
        {isOpen ? <AvatarDropDown isMenu={isOpen} /> : <UserDropdown />}
      </div>
    </aside>
  );
}
