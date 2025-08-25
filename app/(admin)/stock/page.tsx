// Next
import { cookies } from "next/headers";

// Componentes
import InfoCards from "@/components/ui/admin/infoCards";

// Utils
import { setupApiClient } from "@/utils/api/fetchData";

export default async function StockPage() {
  const cookieStore = cookies();
  const token = (await cookieStore).get("auth_token")?.value;

  const api = setupApiClient(token);

  const activeProducts = await api.get("/stocks/filters?is_active=true");

  return (
    <div className="py-6">
      <InfoCards />
    </div>
  );
}
