import React from "react";
import { Edit, Trash2, Package } from "lucide-react";
import { Product } from "../../../types/products/index";

interface ProductCardProps {
  product: Product;
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
}

export function ProductCard({ product, onEdit, onDelete }: ProductCardProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "water":
        return "bg-blue-100 text-blue-800";
      case "soda":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case "water":
        return "Água";
      case "soda":
        return "Refrigerante";
      default:
        return "Outros";
    }
  };

  const isLowStock = product.stock < 10;

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
            <Package className="w-5 h-5 text-gray-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{product.name}</h3>
            <p className="text-sm text-gray-600">{product.brand}</p>
          </div>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => onEdit(product)}
            className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
          >
            <Edit className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(product.id)}
            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(product.category)}`}
          >
            {getCategoryLabel(product.category)}
          </span>
          <span className="text-lg font-bold text-gray-900">
            {formatCurrency(product.price)}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Estoque:</span>
          <span
            className={`font-medium ${isLowStock ? "text-red-600" : "text-green-600"}`}
          >
            {product.stock} unidades
            {isLowStock && <span className="text-xs ml-1">(Baixo)</span>}
          </span>
        </div>

        {product.description && (
          <div className="pt-2 border-t border-gray-100">
            <p className="text-sm text-gray-600">{product.description}</p>
          </div>
        )}
      </div>
    </div>
  );
}
