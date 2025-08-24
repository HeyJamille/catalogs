// Bibliotecas
import {
  FolderSymlinkIcon,
  LayoutDashboard,
  PackageSearch,
} from "lucide-react";

export const data = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
    subItems: [
      { label: "Overview", href: "/overview", icon: FolderSymlinkIcon },
      { label: "Stats", href: "/stats", icon: FolderSymlinkIcon },
    ],
  },
  {
    label: "Produtos",
    href: "/products",
    icon: PackageSearch,
    subItems: [{ label: "estoques", href: "/stock", icon: PackageSearch }],
  },
];
