"use client";

// react
import { AuthContext } from "@/provider/auth";
import { useContext } from "react";

// Bibliotecas
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
  Switch,
  User,
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

export default function UserDropdown({
  ShortenedMenu,
}: {
  ShortenedMenu?: boolean;
}) {
  const { signOut, user } = useContext(AuthContext);

  const loader = useTopLoader();

  return (
    <div className="p-2 w-full max-w-xs bg-white dark:bg-slate-800 rounded-lg shadow-sm">
      <Dropdown
        placement="bottom-start"
        classNames={{
          base: "before:bg-default-200",
          content: "p-0 border-small border-divider bg-background",
        }}
      >
        <DropdownTrigger>
          <div className="flex items-center gap-3 cursor-pointer px-2 py-1">
            <User
              avatarProps={{
                src: user?.photo || undefined,
                isBordered: true,
                radius: "full",
                size: "sm",
                color: "primary",
                icon: <User2 />,
              }}
              classNames={{
                name: "text-blue-600 font-bold truncate max-w-[10rem]",
                description:
                  "text-blue-400 font-semibold truncate max-w-[12rem]",
                base: "gap-3",
              }}
              name={`${user?.name} ${user?.surname}`}
              description={`${user?.rule.name}`}
            />
            <div className="ml-auto">
              <Settings strokeWidth={2.2} className="text-blue-600 w-5 h-5" />
            </div>
          </div>
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
    </div>
  );
}
