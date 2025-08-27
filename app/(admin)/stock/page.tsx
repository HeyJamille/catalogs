// Next
import { cookies } from "next/headers";

// Componentes
import InfoCards from "../../../components/ui/admin/infoCards";
// Utils
import { setupApiClient } from "./../../../utils/api/fetchData";

// Dados
import StockDataOnCards from "./../../../data/cards/stockDataOnCards";
import columns from "./../../../data/columns/products/columns.json";

// Componentes
import Container from "./../../../components/ui/container";
import ToolBar from "./../../../components/ui/admin/toolbar";
import Table from "./../../../components/ui/admin/table";
import { renderCell } from "../../../components/renderCell/product/renderCell";

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
    <div className="space-y-8">
      <h1 className="text-3xl font-semibold text-gray-900 dark:text-white mb-6">
        Gestão de Estoque
      </h1>
      <InfoCards data={cardDetails} />

      <Container>
        <ToolBar
          title="Produtos"
          addItemDescription="Produtos"
          handleRefresh={() => console.log("Ativou!")}
          handleAddItems="/stock/register"
        />
        <Table
          columns={columns}
          data={products.data.products}
          loading={false}
          renderCell={renderCell}
        />
      </Container>
    </div>
  );
}
