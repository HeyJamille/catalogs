import { useState } from "react";
import { Plus, History } from "lucide-react";
import { SaleForm } from "./saleForm";
import { SalesList } from "./saleList";

export function Sales() {
  const [showForm, setShowForm] = useState(false);
  const [activeTab, setActiveTab] = useState<"new" | "history">("new");

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <h2 className="text-2xl font-bold text-gray-900">Vendas</h2>
        <div className="flex space-x-2">
          <button
            onClick={() => setActiveTab("new")}
            className={`px-4 py-2 rounded-lg flex items-center space-x-2 text-sm font-medium transition-colors ${
              activeTab === "new"
                ? "bg-green-100 text-green-700"
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            }`}
          >
            <Plus className="w-4 h-4" />
            <span>Nova Venda</span>
          </button>
          <button
            onClick={() => setActiveTab("history")}
            className={`px-4 py-2 rounded-lg flex items-center space-x-2 text-sm font-medium transition-colors ${
              activeTab === "history"
                ? "bg-blue-100 text-blue-700"
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            }`}
          >
            <History className="w-4 h-4" />
            <span>Histórico</span>
          </button>
        </div>
      </div>

      {activeTab === "new" ? (
        <div className="bg-white rounded-xl border border-gray-200 p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Plus className="w-8 h-8 text-green-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Registrar Nova Venda
          </h3>
          <p className="text-gray-600 mb-6">
            Clique no botão abaixo para registrar uma nova venda
          </p>
          <button
            onClick={() => setShowForm(true)}
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2 mx-auto"
          >
            <Plus className="w-5 h-5" />
            <span>Registrar Venda</span>
          </button>
        </div>
      ) : (
        <SalesList />
      )}

      {showForm && <SaleForm onClose={() => setShowForm(false)} />}
    </div>
  );
}
