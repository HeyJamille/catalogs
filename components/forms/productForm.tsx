"use client";

// React
import React, { useState } from "react";

// Componentes
import Autocomplete from "../ui/autoComplete";
import CommentArea from "../ui/commentArea";
import Container from "../ui/container";
import Form from "../ui/Form";
import Input from "../ui/input";

// Bibliotecas
import Cookies from "js-cookie";
import { addToast, Button } from "@heroui/react";

// Utils
import { MoneyMaskInput } from "@/utils/mask/money/inputMask";
import { setupApiClient } from "@/utils/api/fetchData";

// Tipagem
import { ItemsAutoComplete } from "@/types/autoComplete";
import { removeCurrencyMask } from "@/utils/mask/money/removeMoneyMask";
import { ChevronDownIcon, CircleFadingPlus } from "lucide-react";
interface ProductForm {
  warehouses: ItemsAutoComplete[];
  categories: ItemsAutoComplete[];
  brands: ItemsAutoComplete[];
}

export default function ProductForm({
  warehouses,
  categories,
  brands,
}: ProductForm) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [stockId, setStockId] = useState<string | undefined>("");
  const [categoryId, setCategoryId] = useState<string | undefined>("");
  const [brandId, setBrandId] = useState<string | undefined>("");
  const [salesUnit, setSalesUnit] = useState("");
  const [productCode, setProductCode] = useState<string>("");
  const [currentQuantity, setCurrentQuantity] = useState<string>("");
  const [minimiumQuantity, setMinimiumQuantity] = useState<string>("");
  const [maximumQuantity, setMaximumQuantity] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [purchasePrice, setPurchasePrice] = useState<string>("");
  const [costPrice, setCostPrice] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const token = Cookies.get("auth_token");
  const api = setupApiClient(token);

  const { handleChange: handleChangePrice } = MoneyMaskInput({
    setValue: setPrice,
  });
  const { handleChange: handleChangePurchasePrice } = MoneyMaskInput({
    setValue: setPurchasePrice,
  });
  const { handleChange: handleChangeCostPrice } = MoneyMaskInput({
    setValue: setCostPrice,
  });

  async function handleForm(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const data = {
      name,
      description,
      stock_id: stockId,
      category_id: categoryId,
      brand_id: brandId,
      product_code: productCode,
      sales_unit: salesUnit,
      current_quantity: removeCurrencyMask(currentQuantity),
      minimium_quantity: removeCurrencyMask(minimiumQuantity),
      maximum_quantity: removeCurrencyMask(maximumQuantity),
      price: removeCurrencyMask(price),
      purchase_price: removeCurrencyMask(price),
      cost_price: removeCurrencyMask(costPrice),
    };

    try {
      setLoading(true);
      const resp = await api.post("/stocks", data);

      if (resp.status === 201) {
        addToast({
          title: "Produto cadastrado!",
          description: "O produto foi salvo com sucesso no estoque.",
          variant: "solid",
          color: "success",
          classNames: {
            title: "text-white",
            description: "text-gray-100",
            icon: "text-white",
          },
        });
      } else {
        addToast({
          title: "Erro ao Cadastrar",
          description:
            resp.data.message ||
            "Verifique suas credenciais e tente novamente.",
          variant: "flat",
          color: "danger",
        });
      }
    } catch (err) {
      addToast({
        title: "Erro no servidor",
        description: "Tente novamente mais tarde.",
        variant: "flat",
        color: "danger",
      });
      console.log("Error: ", err);
    }

    setName("");
    setDescription("");
    setStockId("");
    setCategoryId("");
    setBrandId("");
    setSalesUnit("");
    setProductCode("");
    setCurrentQuantity("");
    setMinimiumQuantity("");
    setMaximumQuantity("");
    setPrice("");
    setPurchasePrice("");
    setCostPrice("");

    setLoading(false);
  }

  return (
    <Container>
      <main className="">
        <Form handleForm={handleForm} href="/stock" loading={loading}>
          <Input
            label="Nome do Produto"
            isRequired={true}
            value={name}
            type="text"
            onChange={(e) => setName(e.target.value)}
            placeholder="Digite o nome do produto"
            name="name"
          />

          <Input
            label="Código de Barra"
            isRequired={true}
            placeholder="000000000000000000000000000"
            name="product_code"
            type="number"
            value={productCode}
            onChange={(e) => setProductCode(e.target.value)}
          />
          <Input
            isRequired={true}
            label="Unidade de Venda"
            placeholder="UN"
            type="text"
            name="sales_unit"
            value={salesUnit}
            onChange={(e) => setSalesUnit(e.target.value)}
          />
          <div className="col-span-full">
            <CommentArea
              name="description"
              label="Descrição"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <Input
            label="Quantidade Atual do estoque"
            isRequired={true}
            placeholder="20"
            name="current_quantity"
            value={currentQuantity}
            onChange={(e) => setCurrentQuantity(e.target.value)}
          />
          <Input
            label="Quantidade Mínima do estoque"
            isRequired={true}
            placeholder="10"
            name="minimium_quantity"
            value={minimiumQuantity}
            onChange={(e) => setMinimiumQuantity(e.target.value)}
          />
          <Input
            label="Quantidade Máxima do estoque"
            isRequired={true}
            placeholder="80"
            name="maximum_quantity"
            value={maximumQuantity}
            onChange={(e) => setMaximumQuantity(e.target.value)}
          />
          <Input
            label="Preço de Venda"
            isRequired={true}
            maskMoney={true}
            placeholder="R$ 80"
            name="price"
            onChange={handleChangePrice}
            value={price}
          />
          <Input
            label="Preço de Compra"
            isRequired={true}
            maskMoney={true}
            placeholder="R$ 80"
            name="purchase_price"
            value={purchasePrice}
            onChange={handleChangePurchasePrice}
          />
          <Input
            label="Preço de Custo"
            isRequired={true}
            maskMoney={true}
            placeholder="R$ 85,99"
            name="cost_price"
            value={costPrice}
            onChange={handleChangeCostPrice}
          />
          <div>
            <h3 className="text-lg pb-1 font-semibold text-gray-700">Marcas</h3>
            <div className="flex-col py-3 px-3 border-gray-400 rounded-lg border items-center">
              <p className="text-sm text-gray-500">
                Organize suas marcas para facilitar a busca e destacar seus
                produtos. Isso ajuda seus clientes a encontrarem rapidamente o
                que procuram e valoriza a identidade da sua loja.
              </p>
              <Button
                startContent={<CircleFadingPlus className="w-5 h-5" />}
                className="bg-transparent min-w-0 h-7 px-0 text-blue-500"
              >
                <p className="hover:underline underline-offset-1">
                  Selecione a marca
                </p>
              </Button>
            </div>
          </div>
          <div>
            <h3 className="text-lg pb-1 font-semibold text-gray-700">
              Categorias
            </h3>
            <div className="flex-col py-3 px-3 border-gray-400 rounded-lg border items-center">
              <p className="text-sm text-gray-500">
                Classifique seus produtos em categorias bem definidas para
                otimizar a navegação e facilitar a busca. Uma boa organização
                aumenta a satisfação do cliente e pode impulsionar suas vendas.
              </p>
              <Button
                startContent={<CircleFadingPlus className="w-5 h-5" />}
                className="bg-transparent min-w-0 h-7 px-0 text-blue-500"
              >
                <p className="hover:underline underline-offset-1">
                  Selecione a categoria
                </p>
              </Button>
            </div>
          </div>
          <div>
            <h3 className="text-lg pb-1 font-semibold text-gray-700">
              Almoxarifado
            </h3>
            <div className="flex-col py-3 px-3 border-gray-400 rounded-lg border items-center">
              <p className="text-sm text-gray-500">
                Mantenha seu almoxarifado bem organizado para garantir o
                controle eficiente de estoque e facilitar a distribuição de
                produtos. Uma gestão eficaz evita perdas e melhora a operação da
                sua loja.
              </p>
              <Button
                startContent={<CircleFadingPlus className="w-5 h-5" />}
                className="bg-transparent min-w-0 h-7 px-0 text-blue-500"
              >
                <p className="hover:underline underline-offset-1">
                  Selecione o almoxarifado
                </p>
              </Button>
            </div>
          </div>
        </Form>
      </main>
    </Container>
  );
}
