// Next
import Link from "next/link";
import { usePathname } from "next/navigation";

// Tipagem
interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  icon: React.ReactNode;
  isSupport?: boolean;
}

export default function ActiveSide({
  href,
  children,
  icon,
  isSupport,
}: NavLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href;
  const baseClasses = "flex items-center px-3 py-2 rounded-lg transition";
  const activeClasses = isActive
    ? "bg-blue-500 text-white"
    : isSupport
      ? "text-gray-300 hover:bg-blue-100 hover:text-blue-700"
      : "text-gray-100 hover:bg-blue-100 hover:text-blue-700 font-semibold";

  return (
    <Link href={href} className={`${baseClasses} ${activeClasses}`}>
      {icon}
      <span className="ml-2">{children}</span>
    </Link>
  );
}
