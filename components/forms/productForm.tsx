"use client";

// Next
import { useRouter } from "next/navigation";

// React
import React, { useReducer, useState } from "react";

// Componentes
import CommentArea from "../ui/commentArea";
import Container from "../ui/container";
import Form from "../ui/Form";
import Input from "../ui/input";
import Drawer from "../ui/admin/drawers/drawer";
import DrawerSelect from "../ui/admin/drawers/drawerSelectForm";
import Upload from "../ui/admin/upload";

// Bibliotecas
import { Button, Switch, useDisclosure } from "@heroui/react";
import { Check, CircleFadingPlus, X } from "lucide-react";

// Dados
import inputFields from "@/data/inputsFields/productsFields.json";

// Utils
import { MoneyMaskInput } from "@/utils/mask/money/inputMask";
import { stateActionForm } from "@/utils/stateActionForms";
import { removeCurrencyMask } from "@/utils/mask/money/removeMoneyMask";
import { handleForm } from "@/utils/handle/handleCreate";
import { formatCurrency } from "./../../utils/mask/money/formatCurrency";

// Tipagem
import { ItemsLabels } from "@/types/labels";
import { stockItems } from "@/types/stock";
interface ProductForm {
  warehouses: ItemsLabels[];
  categories: ItemsLabels[];
  brands: ItemsLabels[];
  product?: stockItems;
}

export default function ProductForm({
  warehouses,
  categories,
  brands,
  product,
}: ProductForm) {
  const initial = product
    ? {
        name: product.name,
        salesUnit: product.sales_unit,
        productCode: product.product_code,
        currentQuantity: product.stock.current_quantity ?? 0,
        minimiumQuantity: product.stock.minimium_quantity ?? 0,
        maximumQuantity: product.stock.maximum_quantity ?? 0,
        price: formatCurrency(product.stock.price),
        purchasePrice: formatCurrency(product.stock.purchase_price),
        costPrice: formatCurrency(product.stock.cost_price),
        loading: false,
      }
    : {
        name: "",
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

  const [state, dispatch] = useReducer(
    stateActionForm,
    initial,
    (init) => init
  );
  const [description, setDescription] = useState(product?.description ?? "");
  const [categoryId, setCategoryId] = useState<string[]>([
    `${product?.category.id}`,
  ]);
  const [brandId, setBrandId] = useState<string[]>([`${product?.brand.id}`]);
  const [stockId, setStockId] = useState<string[]>([
    `${product?.stock.warehouse_id}`,
  ]);
  const [urlImagem, setUrlImagem] = useState<string>(product?.url_imagem ?? "");
  const [selectDrawerType, setSelectDrawerType] = useState<string[]>([]);
  const [isActive, setIsActive] = useState<boolean | undefined>(
    product?.is_active
  );
  const [error, setError] = useState<boolean>(false);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const router = useRouter();

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

  async function handleFormProduct(e: React.FormEvent) {
    e.preventDefault();
    dispatch({ type: "SET_LOADING", value: true });

    if (categoryId.length <= 0) setError(true);
    if (brandId.length <= 0) setError(true);
    if (stockId.length <= 0) setError(true);

    const data = {
      name: state.name,
      description: description,
      stock_id: stockId[0],
      category_id: categoryId[0],
      brand_id: brandId[0],
      ...(state.productCode !== product?.product_code && {
        product_code: state.productCode,
      }),
      sales_unit: state.salesUnit,
      current_quantity: removeCurrencyMask(state.currentQuantity),
      minimium_quantity: removeCurrencyMask(state.minimiumQuantity),
      maximum_quantity: removeCurrencyMask(state.maximumQuantity),
      price: removeCurrencyMask(state.price),
      purchase_price: removeCurrencyMask(state.purchasePrice),
      cost_price: removeCurrencyMask(state.costPrice),
      url_imagem: urlImagem,
      is_active: isActive,
      ...(isActive === false && {
        date_of_inactivation: new Date().toISOString(),
      }),
      url_imagem: urlImagem,
    };

    await handleForm({
      isEdit: product && true,
      endpoint: product ? `/stocks/${product.id}` : "/stocks",
      router,
      data,
    });

    dispatch({ type: "RESET", payload: initial });
    !product && setDescription("");
    !product && setUrlImagem("");
    !product && setCategoryId([]);
    !product && setBrandId([]);
    !product && setStockId([]);
    !product && setUrlImagem("");
  }

  return (
    <>
      <Container>
        <main className="p-4">
          <Form handleForm={handleFormProduct} loading={state.loading}>
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
            <div className="col-span-3 flex w-full space-x-4">
              <main className="w-full flex-col flex">
                <CommentArea
                  name="description"
                  label="Descrição"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </main>
              <main className="w-[40%] flex-col flex">
                <h3 className={`text-sm pb-2 font-semibold text-gray-800`}>
                  Upload
                </h3>
                <Upload
                  url={urlImagem}
                  setUrlImg={setUrlImagem}
                  setLoading={(value: boolean) =>
                    dispatch({ type: "SET_LOADING", value })
                  }
                />
              </main>
            </div>
            <div>
              <h3
                className={`text-sm pb-1 font-semibold ${error ? "text-red-500" : "text-gray-700"} `}
              >
                Marcas
              </h3>
              <div
                className={`flex-col py-3 px-3 ${error ? "border-red-400" : "border-gray-400"}  rounded-lg border items-center`}
              >
                <p className="text-sm pb-2 text-gray-500">
                  Organize suas marcas para facilitar a busca e destacar seus
                  produtos. Isso ajuda seus clientes a encontrarem rapidamente o
                  que procuram e valoriza a identidade da sua loja.
                </p>
                <Button
                  startContent={<CircleFadingPlus className="w-5 h-5" />}
                  className="bg-transparent min-w-0 h-7 px-0 text-blue-500"
                  onPress={() => {
                    onOpen();
                    setSelectDrawerType(["brands", "marca"]);
                  }}
                >
                  <p className="hover:underline underline-offset-1">
                    Selecione a marca
                  </p>
                </Button>
              </div>
            </div>
            <div>
              <h3
                className={`text-sm pb-1 font-semibold ${error ? "text-red-500" : "text-gray-700"} `}
              >
                Categorias
              </h3>
              <div
                className={`flex-col py-3 px-3 ${error ? "border-red-400" : "border-gray-400"}  rounded-lg border items-center`}
              >
                <p className="text-sm pb-2 text-gray-500">
                  Classifique seus produtos em categorias bem definidas para
                  otimizar a navegação e facilitar a busca. Uma boa organização
                  aumenta a satisfação do cliente e pode impulsionar suas
                  vendas.
                </p>
                <Button
                  startContent={<CircleFadingPlus className="w-5 h-5" />}
                  className="bg-transparent min-w-0 h-7 px-0 text-blue-500"
                  onPress={() => {
                    onOpen();
                    setSelectDrawerType(["categories", "categoria"]);
                  }}
                >
                  <p className="hover:underline underline-offset-1">
                    Selecione a categoria
                  </p>
                </Button>
              </div>
            </div>
            <div>
              <h3
                className={`text-sm pb-1 font-semibold ${error ? "text-red-500" : "text-gray-700"} `}
              >
                Almoxarifado
              </h3>
              <div
                className={`flex-col py-3 px-3 ${error ? "border-red-400" : "border-gray-400"}  rounded-lg border items-center`}
              >
                <p className="text-sm pb-2 text-gray-500">
                  Mantenha seu almoxarifado bem organizado para garantir o
                  controle eficiente de estoque e facilitar a distribuição de
                  produtos. Uma gestão eficaz evita perdas e melhora a operação
                  da sua loja.
                </p>
                <Button
                  startContent={<CircleFadingPlus className="w-5 h-5" />}
                  className="bg-transparent min-w-0 h-7 px-0 text-blue-500"
                  onPress={() => {
                    onOpen();
                    setSelectDrawerType(["warehouses", "almoxarifado"]);
                  }}
                >
                  <p className="hover:underline underline-offset-1">
                    Selecione o almoxarifado
                  </p>
                </Button>
              </div>
            </div>

            <div className={`${!product && "hidden"}`}>
              <h3
                className={`text-sm pb-2 font-semibold ${error ? "text-red-500" : "text-gray-700"} `}
              >
                Ativar?
              </h3>
              <Switch
                defaultSelected={isActive}
                onValueChange={setIsActive}
                color="success"
                size="sm"
                thumbIcon={({ isSelected }) =>
                  isSelected ? (
                    <Check className="w-5 h-5 p-[0.1em] text-gray-500" />
                  ) : (
                    <X className="w-5 h-5 p-[0.1em] text-gray-500" />
                  )
                }
              />
            </div>
          </Form>
        </main>
      </Container>
      <Drawer
        title={`Selecione uma ${selectDrawerType[1]}`}
        loading={false}
        isOpen={isOpen}
        onClose={onClose}
        displayFooterFilter={false}
        displayFooterRelatory={false}
      >
        <DrawerSelect
          title={`${selectDrawerType[1]}`}
          endpoint={`/${selectDrawerType[0]}`}
          placeholder={`Digite nome da ${selectDrawerType[1]}`}
          data={
            selectDrawerType[0] == "brands"
              ? brands
              : selectDrawerType[0] == "categories"
                ? categories
                : warehouses
          }
          value={
            selectDrawerType[0] == "brands"
              ? brandId
              : selectDrawerType[0] == "categories"
                ? categoryId
                : stockId
          }
          setValue={
            selectDrawerType[0] == "brands"
              ? setBrandId
              : selectDrawerType[0] == "categories"
                ? setCategoryId
                : setStockId
          }
        />
      </Drawer>
    </>
  );
}
