// Next
import { cookies } from "next/headers"; // Componentes

// Componentes
import ContainerLayout from "@/components/ui/admin/containerLayout";
import Autocomplete from "@/components/ui/autoComplete";
import CommentArea from "@/components/ui/commentArea";
import Container from "@/components/ui/container";
import Form from "@/components/ui/Form";
import Input from "@/components/ui/input";

// Utils
import { setupApiClient } from "@/utils/api/fetchData";
import { formatedLabel } from "@/utils/functions/formattedLabel";

// Bibliotecas

export default async function RegisterStock() {
  const cookieStore = cookies();
  const token = (await cookieStore).get("auth_token")?.value;

  const api = setupApiClient(token);
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

  async function handleForm(formData: FormData) {
    "use server";
    console.log("Dados: ", formData);
  }

  return (
    <ContainerLayout title="Cadastro de Produtos">
      <Container>
        <main className="p-2">
          <Form handleForm={handleForm} href="/stock">
            <Input
              label="Nome do Produto"
              isRequired={true}
              placeholder="Digite o nome do produto"
              name="name"
            />
            <Autocomplete
              lable="Selecione um Almoxarifado"
              placeholder="Escolha um Almoxarifado"
              isRequired={true}
              data={warehouses}
              name="warehouse"
            />
            <div className="col-span-full">
              <CommentArea name="description" label="Descrição" />
            </div>
            <Autocomplete
              lable="Selecione uma Categoria"
              isRequired={true}
              placeholder="Escolha uma Categoria"
              data={categories}
              name="category_id"
            />
            <Autocomplete
              lable="Selecione uma Marca"
              isRequired={true}
              placeholder="Escolha uma Marca"
              data={brands}
              name="brand_id"
            />
            <Input
              isRequired={true}
              label="Unidade de Venda"
              placeholder="UN"
              name="sales_unit"
            />
            <Input
              label="Código de Barra"
              isRequired={true}
              placeholder="000000000000000000000000000"
              name="product_code"
            />
            <Input
              label="Quantidade Atual do estoque"
              isRequired={true}
              placeholder="20"
              name="current_quantity"
            />
            <Input
              label="Quantidade Mínima do estoque"
              isRequired={true}
              placeholder="10"
              name="minimium_quantity"
            />
            <Input
              label="Quantidade Máxima do estoque"
              isRequired={true}
              placeholder="80"
              name="maximum_quantity"
            />
            <Input
              label="Preço de Venda"
              isRequired={true}
              maskMoney={true}
              placeholder="R$ 80"
              name="price"
            />
            <Input
              label="Preço de Compra"
              isRequired={true}
              maskMoney={true}
              placeholder="R$ 80"
              name="purchase_price"
            />
            <Input
              label="Preço de Custo"
              isRequired={true}
              maskMoney={true}
              placeholder="R$ 85,99"
              name="cost_price"
            />
          </Form>
        </main>
      </Container>
    </ContainerLayout>
  );
}
