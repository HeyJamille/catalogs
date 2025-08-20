import { FolderSymlinkIcon, PackageSearch } from "lucide-react";

export const data = [
  {
    label: "Dashboard",
    href: "/dashboard",
    subItems: [
      { label: "Overview", href: "/overview", icon: FolderSymlinkIcon },
      { label: "Stats", href: "/stats", icon: FolderSymlinkIcon },
    ],
  },
  {
    label: "Produtos",
    href: "/products",
    subItems: [{ label: "estoques", href: "/stock", icon: PackageSearch }],
  },
];
