"use client";

// React
import { AuthContext } from "@/provider/auth";
import { useContext } from "react";

// Bibliotecas
import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
  Switch,
} from "@heroui/react";
import {
  LogOut,
  MessageSquareText,
  Moon,
  Settings,
  Sun,
  User2,
  UserRoundCog,
} from "lucide-react";
import { useTopLoader } from "nextjs-toploader";

export default function AvatarDropDown({ isMenu }: { isMenu?: boolean }) {
  const { user, signOut } = useContext(AuthContext);

  const loader = useTopLoader();

  return (
    <Dropdown placement="bottom-start">
      <DropdownTrigger>
        <Avatar
          src={user?.photo || undefined}
          radius="sm"
          size="md"
          classNames={{
            base: `${isMenu ? "bg-gray-200 text-blue-900" : "bg-[#3b82f6] text-white"} `,
          }}
          icon={<User2 />}
        />
      </DropdownTrigger>
      <DropdownMenu
        aria-label="User Actions"
        variant="flat"
        className="min-w-[240px]"
      >
        <DropdownItem key="profile" className="gap-1">
          <div className="flex flex-col w-full">
            <p className="text-sm font-semibold text-slate-900 dark:text-slate-100 truncate">
              {user?.name} {user?.surname}
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-300 truncate">
              {user?.email}
            </p>
          </div>
        </DropdownItem>
        <DropdownItem
          key="settings"
          description="Acessar configuração do usuário"
          startContent={<UserRoundCog className="w-5 h-5" />}
          className="px-3"
        >
          Configurações de conta
        </DropdownItem>
        <DropdownItem
          key="system"
          description="Ajustes do sistema"
          startContent={<Settings className="w-5 h-5" />}
          className="px-3"
        >
          Preferências do sistema
        </DropdownItem>
        <DropdownItem
          key="help"
          description="Dúvidas, feedback e documentação"
          startContent={<MessageSquareText className="w-5 h-5" />}
          className="px-3"
        >
          Ajuda & Feedback
        </DropdownItem>

        <DropdownSection title="Preferências">
          <DropdownItem
            key="theme"
            className="flex items-center justify-between px-3"
            description=" Alternar entre claro e escuro"
            endContent={
              <Switch
                defaultSelected
                color="primary"
                size="sm"
                classNames={{
                  thumbIcon: "w-3 h-3 flex items-center justify-center",
                }}
                thumbIcon={({ isSelected, className }) =>
                  isSelected ? (
                    <Sun className={`${className}`} />
                  ) : (
                    <Moon className={`${className}`} />
                  )
                }
              ></Switch>
            }
          >
            Tema
          </DropdownItem>
        </DropdownSection>

        <DropdownSection title="Sessão">
          <DropdownItem
            key="logout"
            color="danger"
            className="text-danger px-3"
            description="Sair do Sistema"
            startContent={<LogOut className="w-5 h-5" />}
            onClick={() => {
              signOut();
              loader.start();
            }}
          >
            Log Out
          </DropdownItem>
        </DropdownSection>
      </DropdownMenu>
    </Dropdown>
  );
}
