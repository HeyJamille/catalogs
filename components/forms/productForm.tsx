"use client";

// React
import { useState } from "react";

// Componentes
import Autocomplete from "../ui/autoComplete";
import CommentArea from "../ui/commentArea";
import Container from "../ui/container";
import Form from "../ui/Form";
import Input from "../ui/input";

// Utils
import { MoneyMaskInput } from "@/utils/mask/inputMask";

// Tipagem
import { ItemsAutoComplete } from "@/types/autoCompleteData";
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
  const [stockId, setStockId] = useState<string | null>("");
  const [categoryId, setCategoryId] = useState<string | null>("");
  const [brandId, setBrandId] = useState<string | null>("");
  const [salesUnit, setSalesUnit] = useState("");
  const [productCode, setProductCode] = useState<string>("");
  const [currentQuantity, setCurrentQuantity] = useState<string>("");
  const [minimiumQuantity, setMinimiumQuantity] = useState<string>("");
  const [maximumQuantity, setMaximumQuantity] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [purchasePrice, setPurchasePrice] = useState<string>("");
  const [costPrice, setCostPrice] = useState<string>("");

  const { handleChange } = MoneyMaskInput({ setValue: setPrice });

  return (
    <Container>
      <main className="p-4">
        <Form href="/stock">
          <Input
            label="Nome do Produto"
            isRequired={true}
            value={name}
            type="text"
            onChange={(e) => setName(e.target.value)}
            placeholder="Digite o nome do produto"
            name="name"
          />
          <Autocomplete
            lable="Selecione um Almoxarifado"
            placeholder="Escolha um Almoxarifado"
            isRequired={true}
            data={warehouses}
            value={stockId}
            setValue={setStockId}
            name="warehouse"
          />
          <div className="col-span-full">
            <CommentArea
              name="description"
              label="Descrição"
              value={description}
              setValue={setDescription}
            />
          </div>
          <Autocomplete
            lable="Selecione uma Categoria"
            isRequired={true}
            placeholder="Escolha uma Categoria"
            data={categories}
            name="category_id"
            value={categoryId}
            setValue={setCategoryId}
          />
          <Autocomplete
            lable="Selecione uma Marca"
            isRequired={true}
            placeholder="Escolha uma Marca"
            data={brands}
            name="brand_id"
            value={brandId}
            setValue={setBrandId}
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
            value={price}
            onChange={handleChange}
          />
          <Input
            label="Preço de Compra"
            isRequired={true}
            maskMoney={true}
            placeholder="R$ 80"
            name="purchase_price"
            value={purchasePrice}
            onChange={(e) => setPurchasePrice(e.target.value)}
          />
          <Input
            label="Preço de Custo"
            isRequired={true}
            maskMoney={true}
            placeholder="R$ 85,99"
            name="cost_price"
            value={costPrice}
            onChange={(e) => setCostPrice(e.target.value)}
          />
        </Form>
      </main>
    </Container>
  );
}
