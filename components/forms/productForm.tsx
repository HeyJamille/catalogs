"use client";

// React
import React, { useReducer, useState } from "react";

// Componentes
import CommentArea from "../ui/commentArea";
import Container from "../ui/container";
import Form from "../ui/Form";
import Input from "../ui/input";

// Bibliotecas
import Cookies from "js-cookie";
import { addToast, Button } from "@heroui/react";
import { CircleFadingPlus } from "lucide-react";

// Dados
import inputFields from "@/data/inputsFields/productsFields.json";

// Utils
import { MoneyMaskInput } from "@/utils/mask/money/inputMask";
import { setupApiClient } from "@/utils/api/fetchData";
import { stateActionForm } from "@/utils/stateActionForms";
import { removeCurrencyMask } from "@/utils/mask/money/removeMoneyMask";

// Tipagem
import { ItemsAutoComplete } from "@/types/autoComplete";
interface ProductForm {
  warehouses: ItemsAutoComplete[];
  categories: ItemsAutoComplete[];
  brands: ItemsAutoComplete[];
}

const initialState = {
  name: "",
  stockId: "",
  categoryId: "",
  brandId: "",
  salesUnit: "",
  productCode: "",
  currentQuantity: "",
  minimiumQuantity: "",
  maximumQuantity: "",
  price: "",
  purchasePrice: "",
  costPrice: "",
  loading: false,
};

export default function ProductForm({
  warehouses,
  categories,
  brands,
}: ProductForm) {
  const [state, dispatch] = useReducer(
    stateActionForm,
    initialState,
    (init) => init
  );
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState<string>("");
  const [brandId, setBrandId] = useState<string>("");
  const [stockId, setStockId] = useState<string>("");

  const token = Cookies.get("auth_token");
  const api = setupApiClient(token);

  const handleChangePrice = MoneyMaskInput({
    setValue: (value: string) =>
      dispatch({ type: "SET_FIELD", field: "price", value }),
  });
  const handleChangePurchasePrice = MoneyMaskInput({
    setValue: (value: string) =>
      dispatch({ type: "SET_FIELD", field: "purchasePrice", value }),
  });
  const handleChangeCostPrice = MoneyMaskInput({
    setValue: (value: string) =>
      dispatch({ type: "SET_FIELD", field: "costPrice", value }),
  });

  async function handleForm(e: React.FormEvent) {
    e.preventDefault();
    dispatch({ type: "SET_LOADING", value: true });

    const data = {
      name: state.name,
      description: state.description,
      stock_id: state.stockId,
      category_id: state.categoryId,
      brand_id: state.brandId,
      product_code: state.productCode,
      sales_unit: state.salesUnit,
      current_quantity: removeCurrencyMask(state.currentQuantity),
      minimium_quantity: removeCurrencyMask(state.minimiumQuantity),
      maximum_quantity: removeCurrencyMask(state.maximumQuantity),
      price: removeCurrencyMask(state.price),
      purchase_price: removeCurrencyMask(state.purchasePrice),
      cost_price: removeCurrencyMask(state.costPrice),
    };
    console.log("Dados: ", data);
    dispatch({ type: "RESET", payload: initialState });
  }

  return (
    <Container>
      <main className="">
        <Form handleForm={handleForm} href="/stock" loading={state.loading}>
          {inputFields.map(
            ({ name, label, type, placeholder, required, mask }) => (
              <Input
                key={name}
                label={label}
                isRequired={required}
                type={type}
                placeholder={placeholder}
                name={name}
                value={state[name]}
                onChange={(e) =>
                  dispatch({
                    type: "SET_FIELD",
                    field: name,
                    value: e.target.value,
                  })
                }
                {...(mask && {
                  maskMoney: true,
                  onChange:
                    name === "price"
                      ? handleChangePrice
                      : name === "purchasePrice"
                        ? handleChangePurchasePrice
                        : handleChangeCostPrice,
                })}
              />
            )
          )}
          <div className="col-span-full">
            <CommentArea
              name="description"
              label="Descrição"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
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
