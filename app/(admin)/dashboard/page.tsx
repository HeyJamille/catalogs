"use client";

import { useEffect, useState } from "react";
import { StatCard } from "./statcards/page";
import {
  AlertTriangle,
  Calendar,
  DollarSign,
  Package,
  ShoppingBag,
  TrendingUp,
} from "lucide-react";

import { useApp } from "@/provider/App";

export default function AdminPage() {
  // const [token, setToken] = useState<string | null>(null);

  // const { getDashboardStats, sales, products } = useApp();

  // const stats = getDashboardStats();

  // const formatCurrency = (value: number) => {
  //   return new Intl.NumberFormat("pt-BR", {
  //     style: "currency",
  //     currency: "BRL",
  //   }).format(value);
  // };

  // const recentSales = sales
  //   .sort(
  //     (a, b) => new Date(b.saleDate).getTime() - new Date(a.saleDate).getTime()
  //   )
  //   .slice(0, 5);

  // const lowStockProducts = products.filter((p) => p.stock < 10);

  return (
    <div className="space-y-6">
      <h1>Dashboard</h1>
      {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
         <StatCard
          title="Total de Vendas"
          value={stats.totalSales}
          icon={ShoppingBag}
          color="blue"
        />
        <StatCard
          title="Receita Total"
          value={formatCurrency(stats.totalRevenue)}
          icon={DollarSign}
          color="green"
        />
        <StatCard
          title="Produtos Cadastrados"
          value={stats.totalProducts}
          icon={Package}
          color="orange"
        />
        <StatCard
          title="Estoque Baixo"
          value={stats.lowStockProducts}
          icon={AlertTriangle}
          color="red"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard
          title="Vendas Hoje"
          value={stats.todaySales}
          icon={Calendar}
          color="blue"
        />
        <StatCard
          title="Receita Semanal"
          value={formatCurrency(stats.weeklyRevenue)}
          icon={TrendingUp}
          color="green"
        />
        <StatCard
          title="Produto Mais Vendido"
          value={stats.topSellingProduct}
          icon={Package}
          color="orange"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Vendas Recentes
          </h3>
          <div className="space-y-3">
            {recentSales.length > 0 ? (
              recentSales.map((sale) => (
                <div
                  key={sale.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div>
                    <p className="font-medium text-gray-900">
                      {sale.productName}
                    </p>
                    <p className="text-sm text-gray-600">
                      {sale.quantity}x -{" "}
                      {sale.customerName || "Cliente não informado"}
                    </p>
                    <p className="text-xs text-gray-500">
                      {new Date(sale.saleDate).toLocaleString("pt-BR")}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-green-600">
                      {formatCurrency(sale.totalAmount)}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center py-4">
                Nenhuma venda registrada
              </p>
            )}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Produtos com Estoque Baixo
          </h3>
          <div className="space-y-3">
            {lowStockProducts.length > 0 ? (
              lowStockProducts.map((product) => (
                <div
                  key={product.id}
                  className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-200"
                >
                  <div>
                    <p className="font-medium text-gray-900">{product.name}</p>
                    <p className="text-sm text-gray-600">{product.brand}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-red-600">
                      {product.stock} unidades
                    </p>
                    <p className="text-xs text-red-500">Estoque baixo</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center py-4">
                Todos os produtos têm estoque adequado
              </p>
            )}
          </div>
        </div>
      </div> */}
    </div>
  );
}
