"use client";

// React
import { useContext } from "react";
import { AuthContext } from "@/provider/auth";

// Next
import { usePathname } from "next/navigation";

// Bibliotecas
import {
  BarChart3,
  Package,
  ShoppingCart,
  ListCheck,
  FileText,
} from "lucide-react";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  User,
} from "@heroui/react";
import { Navbar, NavbarBrand, NavbarContent } from "@heroui/navbar";

// Componentes
import NavItemLink from "./MenuItemLink";
import NavItemDropdown from "./menuItemDropwn";

export default function Menu() {
  const pathname = usePathname();

  const { signOut, user } = useContext(AuthContext);

  const itens = [
    { id: 1, label: "Dashboard", href: "/dashboard", icon: BarChart3 },
    {
      id: 2,
      label: "Estoques",
      icon: Package,
      dropdownOptions: [
        {
          key: "ver",
          label: "Ver Estoques",
          description: "Visualize seus estoques atuais",
          Icon: ListCheck,
        },
        {
          key: "relatorio",
          label: "Relatório",
          description: "Confira relatórios de movimentação",
          Icon: FileText,
        },
      ],
    },
    { id: 3, label: "Vendas", href: "/vendas", icon: ShoppingCart },
  ];

  return (
    <Navbar maxWidth="2xl" isBordered isBlurred={false}>
      <NavbarBrand>
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <ShoppingCart className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-xl font-bold text-gray-900">
            I&I Águas e Variedades
          </h1>
        </div>
      </NavbarBrand>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {itens.map((item) =>
          item.dropdownOptions ? (
            <NavItemDropdown
              key={item.id}
              label={item.label}
              Icon={item.icon}
              options={item.dropdownOptions.map((opt) => ({
                ...opt,
                onAction:
                  opt.key === "relatorio"
                    ? () => console.log("Relatório")
                    : undefined,
              }))}
            />
          ) : (
            <NavItemLink
              key={item.id}
              href={item.href!}
              label={item.label}
              Icon={item.icon}
              isActive={pathname === item.href}
            />
          )
        )}
      </NavbarContent>

      {/* Dropdown do usuário */}
      <NavbarContent as="div" className="items-center" justify="end">
        <Dropdown placement="bottom-start">
          <DropdownTrigger>
            <User
              as="button"
              avatarProps={{
                isBordered: true,
                src: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
              }}
              className="transition-transform"
              description={user?.rule.name}
              name={`${user?.name} ${user?.surname}`}
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="User Actions" variant="flat">
            <DropdownItem key="profile" className="h-14 gap-2">
              <p className="font-bold">Signed in as</p>
              <p className="font-bold">@tonyreichert</p>
            </DropdownItem>
            <DropdownItem key="settings">My Settings</DropdownItem>
            <DropdownItem key="team_settings">Team Settings</DropdownItem>
            <DropdownItem key="analytics">Analytics</DropdownItem>
            <DropdownItem key="system">System</DropdownItem>
            <DropdownItem key="configurations">Configurations</DropdownItem>
            <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
            <DropdownItem onClick={signOut} key="logout" color="danger">
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
    </Navbar>
  );
}
