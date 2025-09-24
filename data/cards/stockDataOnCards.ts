// Utils
import { sumValues } from "@/utils/functions/sumValues";
import { formatCurrency } from "@/utils/mask/money/formatCurrency";

// Bibliotecas
import { Banknote, BanknoteArrowUp, Box } from "lucide-react";

// Tipagem
import { stockItems } from "@/types/stock";
interface StockDataOnCardsProps {
  stockData: stockItems[];
  productsLowStock: number;
}

export default function StockDataOnCards({
  stockData = [],
  productsLowStock
}: StockDataOnCardsProps) {
  const totalProductCost = sumValues(
    stockData,
    (item) => item.stock?.cost_price || 0
  );
  const totalQuantity = sumValues(
    stockData,
    (item) => item.stock?.current_quantity || 0
  );
  const stockValue = totalProductCost * totalQuantity;
  const totalProductValue = sumValues(
    stockData,
    (item) => item.stock?.price || 0
  );
  const stockProfit = (totalProductValue - totalProductCost) * totalQuantity;
  const totalRevenue = totalProductValue * totalQuantity;
  const marginPercentage =
    totalRevenue > 0 ? (stockProfit / totalRevenue) * 100 : 0;

  const cardDetails = [
    {
      icon: Banknote,
      title: "Custo Total",
      value: formatCurrency(stockValue),
    },
    {
      icon: BanknoteArrowUp,
      title: "Lucro Potencial",
      value: formatCurrency(stockProfit),
      percentage: marginPercentage.toFixed(0),
    },
    {
      icon: Box,
      title: "Estoque Baixo",
      value: productsLowStock.toString(),
    },
  ];

  return cardDetails;
}
