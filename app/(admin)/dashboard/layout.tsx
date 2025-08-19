// Componentes
import HeaderNav from "@/components/menu/admin/headerNav";
import SideNav from "@/components/menu/admin/sideNav";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="w-full flex">
      <SideNav />
      <main className="w-full p-4 ">
        <HeaderNav />
        {children}
      </main>
    </main>
  );
}
