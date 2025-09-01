// Next
import { cookies } from "next/headers";

// Componentes
import InfoCards from "../../../components/ui/admin/infoCards";

// Utils
import { setupApiClient } from "./../../../utils/api/fetchData";

// Dados
import StockDataOnCards from "@/data/cards/stockDataOnCards";
import columns from "./../../../data/columns/products/columns.json";

// Componentes
import ContainerLayout from "@/components/ui/admin/containerLayout";
import { renderCell } from "@/components/renderCell/product/renderCell";
import DataGrid from "@/components/ui/admin/dataGrid";

export default async function StockPage() {
  const cookieStore = cookies();
  const token = (await cookieStore).get("auth_token")?.value;

  const api = setupApiClient(token);

  const activeProducts = await api.get("/stocks/filters?is_active=true");
  const products = await api.get("/stocks");
  const cardDetails = StockDataOnCards({
    stockData: activeProducts.data.products,
  });

  return (
    <ContainerLayout title="Gestão de Estoque">
      <InfoCards data={cardDetails} />
      <DataGrid
        title="Produtos"
        addItemDescription="Produtos"
        handleAddItems="/stock/register"
        columns={columns}
        data={products.data.products}
        renderCell={renderCell}
      />
    </ContainerLayout>
  );
}
