"use client";

// Next
import { useRouter } from "next/navigation";

// React
import React, { useReducer, useState, useTransition } from "react";

// Componentes
import CommentArea from "../ui/commentArea";
import Container from "../ui/container";
import Form from "../ui/Form";
import Input from "../ui/input";
import Drawer from "../ui/admin/drawers/drawer";

// Bibliotecas
import Cookies from "js-cookie";
import {
  addToast,
  Button,
  Checkbox,
  Divider,
  useDisclosure,
} from "@heroui/react";
import { CircleFadingPlus, Pencil, Trash } from "lucide-react";

// Dados
import inputFields from "@/data/inputsFields/productsFields.json";

// Utils
import { MoneyMaskInput } from "@/utils/mask/money/inputMask";
import { setupApiClient } from "@/utils/api/fetchData";
import { stateActionForm } from "@/utils/stateActionForms";
import { removeCurrencyMask } from "@/utils/mask/money/removeMoneyMask";

// Tipagem
import { ItemsAutoComplete } from "@/types/autoComplete";
import Loading from "../ui/admin/loading";
import DrawerSelect from "../ui/admin/drawers/drawerSelect";
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
  const [value, setValue] = useState<string>("");
  const [loading, setLoading] = useTransition();

  const token = Cookies.get("auth_token");
  const api = setupApiClient(token);
  const router = useRouter();

  const { isOpen, onOpen, onClose } = useDisclosure();

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

    dispatch({ type: "RESET", payload: initialState });
  }

  async function handleRemoveCategory(id: string) {
    try {
      await api.delete(`/categories/${id}`);
      setLoading(() => {
        router.refresh();
      });

      addToast({
        title: "A categoria foi excluída com sucesso",
        variant: "solid",
        color: "success",
        classNames: {
          title: "text-white",
          description: "text-gray-100",
          icon: "text-white",
        },
      });
    } catch (err) {
      addToast({
        title: "Erro no servidor",
        description: "Tente novamente mais tarde.",
        variant: "flat",
        color: "danger",
      });

      console.error("Erro ao excluir categoria: ", err);
    }
  }

  async function handleFormCategory(e: React.FormEvent) {
    e.preventDefault();

    try {
      await api.post("/categories/", { name: value });

      setLoading(() => {
        router.refresh();
      });

      addToast({
        title: "A categoria foi adicionada com sucesso!",
        variant: "solid",
        color: "success",
        classNames: {
          title: "text-white",
          description: "text-gray-100",
          icon: "text-white",
        },
      });
    } catch (err) {
      console.error("Erro ao excluir categoria: ", err);

      addToast({
        title: "Erro no servidor",
        description: "Tente novamente mais tarde.",
        variant: "flat",
        color: "danger",
      });
    }
  }

  return (
    <>
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
              <h3 className="text-lg pb-1 font-semibold text-gray-700">
                Marcas
              </h3>
              <div className="flex-col py-3 px-3 border-gray-400 rounded-lg border items-center">
                <p className="text-sm text-gray-500">
                  Organize suas marcas para facilitar a busca e destacar seus
                  produtos. Isso ajuda seus clientes a encontrarem rapidamente o
                  que procuram e valoriza a identidade da sua loja.
                </p>
                <Button
                  startContent={<CircleFadingPlus className="w-5 h-5" />}
                  className="bg-transparent min-w-0 h-7 px-0 text-blue-500"
                  onPress={() => onOpen()}
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
                  aumenta a satisfação do cliente e pode impulsionar suas
                  vendas.
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
                  produtos. Uma gestão eficaz evita perdas e melhora a operação
                  da sua loja.
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
      <Drawer title="Marcas" isOpen={isOpen} onClose={onClose}>
        <DrawerSelect
          data={categories}
          loading={loading}
          handleRemove={handleRemoveCategory}
        />
        {/* <Input placeholder="Buscar categoria" />
        <Divider />
        <Button
          startContent={<CircleFadingPlus className="w-5 h-5" />}
          className="bg-transparent min-w-0 h-7 px-0 text-blue-500"
          // onPress={() => onOpen()}
        >
          <p className="hover:underline underline-offset-1">
            Adicione uma marca
          </p>
        </Button>
        <Divider />
        {loading ? (
          <Loading />
        ) : (
          categories.map((category) => (
            <main
              key={category.id}
              className="w-full border-b border-gray-300 flex justify-between"
            >
              <Checkbox
                size="md"
                radius="sm"
                classNames={{
                  base: "max-w-full w-full flex items-center hover:bg-gray-100 rounded-lg transition-colors  p-2 m-1",
                  label: "w-full text-sm ",
                  wrapper: "",
                }}
              >
                {category.label}
              </Checkbox>
              <div className="flex items-center">
                <Button
                  variant="light"
                  radius="full"
                  className="min-w-10 h-10 px-2 "
                >
                  <Pencil className="w-4 h-4 text-gray-700" />
                </Button>
                <Button
                  variant="light"
                  radius="full"
                  className="min-w-10 h-10 px-2 text-gray-700 data-[hover=true]:bg-red-500 data-[hover=true]:text-white"
                  onPress={() => handleRemoveCategory(category.id)}
                >
                  <Trash className="w-4 h-4" />
                </Button>
              </div>
            </main>
          ))
        )} */}
      </Drawer>
    </>
  );
}
