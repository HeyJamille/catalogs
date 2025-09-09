// Next
import { cookies } from "next/headers";

// Componentes
import ContainerLayout from "@/components/ui/admin/containerLayout";
import ProductForm from "@/components/forms/productForm";

// Utils
import { setupApiClient } from "@/utils/api/fetchData";
import { formatedLabel } from "@/utils/functions/formattedLabel";

export default async function EditStock({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const cookieStore = cookies();
  const token = (await cookieStore).get("auth_token")?.value;

  const api = setupApiClient(token);

  const productsData = await api.get(`/stocks/${(await params).id}`);
  const warehouseData = await api.get("/warehouses/filter?is_active=true");
  const categoriesData = await api.get("/categories");
  const brandsData = await api.get("/brands");

  const warehouses = formatedLabel(warehouseData.data.warehouses, "id", "name");
  const categories = formatedLabel(
    categoriesData.data.categories,
    "id",
    "name"
  );
  const brands = formatedLabel(brandsData.data.brands, "id", "name");

  return (
    <ContainerLayout title="Edição de Estoque">
      <ProductForm
        warehouses={warehouses}
        categories={categories}
        brands={brands}
        product={productsData.data.product}
      />
    </ContainerLayout>
  );
}
