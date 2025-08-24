// Componentes
import Layout from "@/components/ui/admin/layout";

// Utils
import { setupApiClient } from "@/utils/api/fetchData";

// Next
import { cookies } from "next/headers";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = cookies();
  const token = (await cookieStore).get("auth_token")?.value;
  const api = setupApiClient(token);

  const enterprise = await api.get("/companies/");

  return <Layout companysData={enterprise.data.enterprise}>{children}</Layout>;
}
