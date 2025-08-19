"use client";

// React
import { useState } from "react";

// Bibliotecas
import { NavbarItem } from "@heroui/navbar";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/react";
import { ChevronDown, ChevronUp, LucideIcon } from "lucide-react";

// Tipagem
interface DropdownOption {
  key: string;
  label: string;
  description?: string;
  Icon?: LucideIcon;
  onAction?: () => void;
}

interface NavItemDropdownProps {
  label: string;
  Icon: LucideIcon;
  options: DropdownOption[];
}

export default function NavItemDropdown({
  label,
  Icon,
  options,
}: NavItemDropdownProps) {
  const [open, setOpen] = useState(false);

  return (
    <NavbarItem>
      <Dropdown isOpen={open} onOpenChange={setOpen}>
        <DropdownTrigger>
          <button className="flex items-center gap-1 px-3 py-1 rounded-md hover:bg-gray-100">
            <Icon className="w-4 h-4" />
            <span>{label}</span>
            {open ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </button>
        </DropdownTrigger>

        <DropdownMenu aria-label={`${label} options`} className="mt-2">
          {options.map((opt) => (
            <DropdownItem
              key={opt.key}
              startContent={
                opt.Icon ? <opt.Icon className="w-5 h-5" /> : undefined
              }
              description={opt.description}
              onAction={opt.onAction}
            >
              {opt.label}
            </DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
    </NavbarItem>
  );
}
