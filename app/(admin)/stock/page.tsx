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

// Utils
import { formatedLabel } from "@/utils/functions/formattedLabel";

// Tipagem
import { FilterItem } from "@/types/filter";

export default async function StockPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const cookieStore = cookies();
  const token = (await cookieStore).get("auth_token")?.value;
  const api = setupApiClient(token);
  const category = (await searchParams)?.category;
  const warehouse = (await searchParams)?.warehouse;

  const productsData = await api.get(
    `/stocks/filters?is_active=true${category && `&categories=${category}`}`
  );
  const warehouseData = await api.get("/warehouses/filter?is_active=true");
  const categoriesData = await api.get("/categories");
  const brandsData = await api.get("/brands");

  const cardDetails = StockDataOnCards({
    stockData: productsData.data.products,
  });
  categoriesData;
  const warehouses = formatedLabel(warehouseData.data.warehouses, "id", "name");
  const categories = formatedLabel(
    categoriesData.data.categories,
    "id",
    "name"
  );
  const brands = formatedLabel(brandsData.data.brands, "id", "name");

  const dataFilter: FilterItem[] = [
    {
      id: 1,
      title: "Filtrar por almoxarifado",
      name: "warehouses",
      data: warehouses,
    },
    {
      id: 2,
      title: "Filtrar por categorias",
      name: "categories",
      data: categories,
    },
    { id: 3, title: "Filtrar por marcas", name: "brands", data: brands },
  ];

  return (
    <ContainerLayout title="Gestão de Estoque">
      <InfoCards data={cardDetails} />
      <DataGrid
        title="Produtos"
        addItemDescription="Produtos"
        handleAddItems="/stock/register"
        columns={columns}
        data={productsData.data.products}
        dataFilter={dataFilter}
        renderCell={renderCell}
      />
    </ContainerLayout>
  );
}
