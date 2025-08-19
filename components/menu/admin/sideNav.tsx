"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  ChevronDown,
  ChevronUp,
  FolderSymlinkIcon,
  LogIn,
  LogOut,
} from "lucide-react";
import slogan from "@/public/assets/slogan.png";
import { Button } from "@heroui/button";
import { User } from "@heroui/react";
import { useState } from "react";

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  icon: React.ReactNode;
}

const NavLink = ({ href, children, icon }: NavLinkProps) => {
  const pathname = usePathname();
  const isActive = pathname === href;
  const baseClasses = "flex items-center px-3 py-2 rounded-lg transition";
  const activeClasses = isActive
    ? "bg-blue-500 text-white"
    : "text-gray-500 hover:bg-blue-100 hover:text-blue-700";

  return (
    <Link href={href} className={`${baseClasses} ${activeClasses}`}>
      {icon}
      <span className="ml-2">{children}</span>
    </Link>
  );
};

export default function SideNav() {
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);
  const [isReportsOpen, setIsReportsOpen] = useState(false);

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

        <div className="space-y-1">
          <Button
            startContent={
              <div className="w-full flex items-center">
                <FolderSymlinkIcon className="w-5 h-5 mr-3" />
                <span className="font-semibold text">Dashboard</span>
              </div>
            }
            endContent={
              isDashboardOpen ? (
                <ChevronUp className="w-4 h-4 mr-3" />
              ) : (
                <ChevronDown className="w-4 h-4 mr-3" />
              )
            }
            onClick={() => setIsDashboardOpen(!isDashboardOpen)}
            className="flex items-center bg-gray-100 w-full px-3 py-2 rounded-lg text-blue-900 transition"
          />
          {isDashboardOpen && (
            <div className="pl-8 space-y-1">
              <NavLink
                href="/overview"
                icon={<FolderSymlinkIcon className="w-4 h-4 mr-2" />}
              >
                Overview
              </NavLink>
              <NavLink
                href="/stats"
                icon={<FolderSymlinkIcon className="w-4 h-4 mr-2" />}
              >
                Stats
              </NavLink>
            </div>
          )}
        </div>

        <div className="space-y-1">
          <Button
            startContent={
              <div className="w-full flex items-center text-gray-200">
                <FolderSymlinkIcon className="w-5 h-5 mr-3" />
                <span className="font-semibold">Relatórios</span>
              </div>
            }
            endContent={
              isReportsOpen ? (
                <ChevronUp className="w-4 h-4 mr-3 text-gray-200" />
              ) : (
                <ChevronDown className="w-4 h-4 mr-3 text-gray-200" />
              )
            }
            onClick={() => setIsReportsOpen(!isReportsOpen)}
            className="flex items-center bg-transparent text-gray-200 hover:bg-gray-100 w-full px-3 py-2 rounded-lg text-blue-900 transition"
          />
          {isReportsOpen && (
            <div className="pl-8 space-y-1">
              <NavLink
                href="/overview"
                icon={<FolderSymlinkIcon className="w-4 h-4 mr-2" />}
              >
                Overview
              </NavLink>
              <NavLink
                href="/stats"
                icon={<FolderSymlinkIcon className="w-4 h-4 mr-2" />}
              >
                Stats
              </NavLink>
            </div>
          )}
        </div>
      </nav>

      <div className="border-b border-gray-200 mx-2"></div>

      <div className="p-2">
        <div className="w-full p-2 rounded-md flex items-center justify-between bg-blue-500">
          <div className="w-full flex items-center space-x-3">
            <User
              avatarProps={{
                src: "https://i.pravatar.cc/150?u=a04258114e29026702d",
              }}
              description="Product Designer"
              name="Jane Doe"
              classNames={{
                name: "text-white",
                description: "text-gray-300 opacity-60",
              }}
            />
          </div>
          <div>
            <LogIn size={22} className="text-white" />
          </div>
        </div>
      </div>
    </aside>
  );
}
