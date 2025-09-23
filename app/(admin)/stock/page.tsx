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

  const search = await searchParams;
  const page = search.page;
  const limit = search.limit;
  const category = search.category;
  const warehouse = search.warehouse;
  const brand = search.brand;
  const isActive = search.is_active;

  const query = new URLSearchParams({
    ...(isActive !== "all" ? { is_active: String(isActive) } : {}),
    ...(category ? { categories: String(category) } : {}),
    ...(warehouse ? { warehouse: String(warehouse) } : {}),
    ...(brand ? { brands: String(brand) } : {}),
  }).toString();

  const [productsData, warehouseData, categoriesData, brandsData] =
    await Promise.all([
      api.get(`/stocks/filters?${query}&limit=10&page=1`),
      api.get("/warehouses/filter?is_active=true"),
      api.get("/categories"),
      api.get("/brands"),
    ]);

  const cardDetails = StockDataOnCards({
    stockData: productsData.data.products,
  });
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
    {
      id: 4,
      title: "Status do Produto",
      name: "is_active",
      data: [
        { id: "true", label: "Ativado" },
        { id: "false", label: "Desativado" },
        { id: "all", label: "Todos" },
      ],
    },
  ];
<<<<<<< HEAD
  console.log("Dados: ", productsData.data);
=======
  const pagination = {totalItems: productsData.data.totalItems, endpoint: '/stocks'}

>>>>>>> fe63c346deb74a93a9db259491377efc41fc0342
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
        relatoryData={[{ id: "excel", label: "Excel (.XLS)", disable: true }]}
        activateReportingOption={true}
        pagination={pagination}
        renderCell={renderCell}
      />
    </ContainerLayout>
  );
}
