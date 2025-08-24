"use client";

// Next
import { usePathname } from "next/navigation";
import Link from "next/link";

// Bibliotecas
import { AlignJustify, Bell, Moon, Store, Sun } from "lucide-react";
import { Button } from "@heroui/button";

// Componentes
import AvatarDropDown from "@/components/ui/admin/dropdown/avatarDropDown";

// Utils
import CheckStoreStatus from "@/utils/functions/checkStoreStatus";

// Tipagem
import { enterpriseItems } from "@/types/enterprise";
interface HeaderNavProps {
  companysData: enterpriseItems[];
  isOpen: boolean;
  isClose: () => void;
}

export default function HeaderNav({
  companysData,
  isOpen,
  isClose,
}: HeaderNavProps) {
  const router = usePathname();

  const firstPart = router.split("/")[1];
  const secondPart = router.split("/")[2];

  return (
    <header className="block w-full max-w-full bg-transparent text-white shadow-none rounded-xl transition-all px-0">
      <div className="flex w-full flex-col-reverse justify-between gap-6 md:flex-row md:items-center">
        <div className="capitalize">
          <nav aria-label="breadcrumb" className="w-max">
            <ol className="flex flex-wrap items-center w-full bg-opacity-60 rounded-md bg-transparent p-0 transition-all">
              <li className="flex items-center text-blue-gray-900 antialiased font-sans text-sm font-normal leading-normal cursor-pointer transition-colors duration-300 hover:text-light-blue-500">
                <Link href={`/${firstPart}`}>
                  <p className="block antialiased font-sans text-sm leading-normal text-blue-900 font-normal opacity-50 transition-all hover:text-blue-500 hover:opacity-100">
                    {firstPart}
                  </p>
                </Link>
                <span className="text-gray-500 text-sm antialiased font-sans font-normal leading-normal mx-2 pointer-events-none select-none">
                  /
                </span>
              </li>
              <li className="flex items-center text-blue-900 antialiased font-sans text-sm font-normal leading-normal cursor-pointer transition-colors duration-300 hover:text-blue-500">
                <Link
                  href={`/${firstPart}/${secondPart}`}
                  className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal"
                >
                  {secondPart}
                </Link>
              </li>
            </ol>
          </nav>
          <h6 className="block antialiased tracking-normal font-sans text-base font-semibold leading-relaxed text-gray-900">
            {secondPart}
          </h6>
        </div>

        <div className="flex flex-wrap justify-center gap-6">
          {companysData.map((company) => {
            const isOpen = CheckStoreStatus(
              company.opening_hours,
              company.close_hours
            );

            return (
              <div key={company.id} className="flex flex-col items-center">
                <div className="flex items-center text-sm text-gray-500">
                  <Store className="w-5 h-5 mr-1" />
                  <h3 className="text-lg font-bold text-gray-700">Loja</h3>
                </div>
                <div
                  className={`flex items-center font-semibold text-sm ${isOpen ? "text-blue-500" : "text-red-500"}`}
                >
                  <span>{isOpen ? "Aberta agora" : "Fechada agora"}</span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex space-x-2 items-center">
          <Button radius="sm" className="bg-[#3b82f6] transition-all min-w-10">
            <span className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2">
              <Moon className="h-5 w-5 text-gray-200" />
            </span>
          </Button>

          <Button radius="sm" className="bg-[#3b82f6] transition-all min-w-10">
            <span className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2">
              <Bell className="h-5 w-5 text-gray-200" />
            </span>
          </Button>

          <AvatarDropDown />
          <Button
            onClick={() => isClose()}
            radius="sm"
            className={`${isOpen ? "bg-[#3b82f6] text-gray-200" : "bg-transparent text-gray-800"} transition-all min-w-10`}
          >
            <span className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2">
              <AlignJustify className="h-5 w-5 " />
            </span>
          </Button>
        </div>
      </div>
    </header>
  );
}
