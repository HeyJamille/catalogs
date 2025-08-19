"use client";

// Bibliotecas
import { NavbarItem } from "@heroui/navbar";
import { LucideIcon } from "lucide-react";

// Next
import Link from "next/link";

// Tipagem
interface NavItemLinkProps {
  href: string;
  label: string;
  Icon: LucideIcon;
  isActive?: boolean;
}

export default function NavItemLink({
  href,
  label,
  Icon,
  isActive,
}: NavItemLinkProps) {
  return (
    <NavbarItem isActive={!!isActive}>
      <Link
        href={href}
        className="flex items-center gap-2 px-3 py-1 rounded-md"
      >
        <Icon className="w-4 h-4" />
        <span>{label}</span>
      </Link>
    </NavbarItem>
  );
}
