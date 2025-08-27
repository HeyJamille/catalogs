// Componentes
import ContainerLayout from "@/components/ui/admin/containerLayout";
import Autocomplete from "@/components/ui/autoComplete";
import CommentArea from "@/components/ui/commentArea";
import Container from "@/components/ui/container";
import Form from "@/components/ui/Form";
import Input from "@/components/ui/input";

// Bibliotecas

export default async function RegisterStock() {
  async function handleForm(formData: FormData) {
    "use server";

    const warehouse = formData.get("warehouse");
    console.log("Dados do formulario: ", formData.get("warehouse"));
    if (warehouse === "Cadastrar Um Novo Almoxarifado") {
      return <p>teste</p>;
    }
  }

  return (
    <ContainerLayout title="Cadastro de Produtos">
      <Container>
        <main className="p-2">
          <Form handleForm={handleForm} href="/stock">
            <Input
              label="Nome do Produto"
              // isRequired={true}
              placeholder="Digite o nome do produto"
            />
            <Autocomplete
              lable="Selecione um Almoxarifado"
              placeholder="Escolha um Almoxarifado"
              name="warehouse"
              data={[
                { id: "1", label: "Estoque do Online" },
                { id: "2", label: "Estoque da Matriz" },
                { id: "3", label: "Cadastrar Um Novo Almoxarifado" },
              ]}
            />
            <div className="col-span-full">
              <CommentArea label="Descrição" />
            </div>
            <Autocomplete
              lable="Selecione uma Categoria"
              placeholder="Escolha uma Categoria"
              data={[
                { id: "1", label: "Fones de Ouvidos" },
                { id: "2", label: "Carregadores" },
                { id: "3", label: "Capinhas" },
                { id: "3", label: "Cadastrar Uma Nova Categoria" },
              ]}
            />
            <Autocomplete
              lable="Selecione uma Marca"
              placeholder="Escolha uma Marca"
              data={[
                { id: "1", label: "Peining" },
                { id: "2", label: "Kimaster" },
                { id: "3", label: "B-max" },
                { id: "3", label: "Cadastrar Uma Nova Marca" },
              ]}
            />
            <Input label="Unidade de Venda" placeholder="UN" />
            <Input
              label="Código de Barra"
              // isRequired={true}
              placeholder="000000000000000000000000000"
            />
            <Input
              label="Quantidade Atual do estoque"
              // isRequired={true}
              placeholder="20"
            />
            <Input
              label="Quantidade Mínima do estoque"
              // isRequired={true}
              placeholder="10"
            />
            <Input
              label="Quantidade Máxima do estoque"
              // isRequired={true}
              placeholder="80"
            />
            <Input
              label="Preço de Venda"
              // isRequired={true}
              placeholder="R$ 80"
            />
            <Input
              label="Preço de Compra"
              // isRequired={true}
              placeholder="R$ 80"
            />
            <Input
              label="Preço de Custo"
              // isRequired={true}
              placeholder="R$ 85,99"
            />
          </Form>
        </main>
      </Container>
    </ContainerLayout>
  );
}
