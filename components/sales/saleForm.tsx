import React, { useState } from "react";
import { Plus, X } from "lucide-react";
import { useApp } from "../../provider/App";

interface SaleFormProps {
  onClose: () => void;
}

export function SaleForm({ onClose }: SaleFormProps) {
  const { products, addSale } = useApp();
  const [formData, setFormData] = useState({
    productId: "",
    quantity: "",
    customerName: "",
  });

  const selectedProduct = products.find((p) => p.id === formData.productId);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.productId || !formData.quantity) {
      alert("Por favor, selecione um produto e informe a quantidade");
      return;
    }

    const quantity = parseInt(formData.quantity);
    if (!selectedProduct || quantity > selectedProduct.stock) {
      alert("Quantidade não disponível em estoque");
      return;
    }

    const totalAmount = selectedProduct.price * quantity;

    addSale({
      productId: formData.productId,
      productName: selectedProduct.name,
      quantity,
      unitPrice: selectedProduct.price,
      totalAmount,
      customerName: formData.customerName,
    });

    onClose();
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const totalAmount =
    selectedProduct && formData.quantity
      ? selectedProduct.price * parseInt(formData.quantity)
      : 0;

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-md w-full">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">
              Registrar Venda
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Produto *
              </label>
              <select
                name="productId"
                value={formData.productId}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="">Selecione um produto</option>
                {products
                  .filter((product) => product.stock > 0)
                  .map((product) => (
                    <option key={product.id} value={product.id}>
                      {product.name} - {formatCurrency(product.price)} (Est:{" "}
                      {product.stock})
                    </option>
                  ))}
              </select>
            </div>

            {selectedProduct && (
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="flex justify-between text-sm">
                  <span>Preço unitário:</span>
                  <span className="font-medium">
                    {formatCurrency(selectedProduct.price)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Estoque disponível:</span>
                  <span className="font-medium">
                    {selectedProduct.stock} unidades
                  </span>
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Quantidade *
              </label>
              <input
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                min="1"
                max={selectedProduct?.stock || 0}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="0"
                required
                disabled={!selectedProduct}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nome do Cliente
              </label>
              <input
                type="text"
                name="customerName"
                value={formData.customerName}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Nome do cliente (opcional)"
              />
            </div>

            {totalAmount > 0 && (
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-green-800">
                    Total da Venda:
                  </span>
                  <span className="text-lg font-bold text-green-600">
                    {formatCurrency(totalAmount)}
                  </span>
                </div>
              </div>
            )}

            <div className="flex space-x-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center space-x-2"
              >
                <Plus className="w-4 h-4" />
                <span>Registrar</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
