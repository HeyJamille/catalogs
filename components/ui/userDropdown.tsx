"use client";

// react
import { AuthContext } from "@/provider/auth";
import { useContext } from "react";

// Bibliotecas
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  User,
} from "@heroui/react";
import { Settings } from "lucide-react";

export default function UserDropdown() {
  const { signOut, user } = useContext(AuthContext);

  return (
    <div className="p-2 w-full">
      <Dropdown placement="bottom-start">
        <DropdownTrigger>
          <div className="flex items-center w-full justify-between">
            <div className="flex items-center space-x-3">
              <User
                as="button"
                avatarProps={{
                  src: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
                }}
                classNames={{
                  name: "text-white",
                  description: "text-gray-300 opacity-60",
                }}
                description="@tonyreichert"
                name="Tony Reichert"
              />
            </div>
            <div>
              <Settings className="text-white w-4 h-4" />
            </div>
          </div>
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
          <DropdownItem key="logout" color="danger">
            Log Out
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}
