// Utils
import { sumValues } from "@/utils/functions/sumValues";
import { formatCurrency } from "@/utils/mask/formatCurrency";

// Bibliotecas
import { Banknote, BanknoteArrowUp, Box } from "lucide-react";

// Tipagem
import { productItems } from "@/types/product";
interface StockDataOnCardsProps {
  stockData: productItems[];
}

export default function StockDataOnCards({ stockData }: StockDataOnCardsProps) {
  const totalProductCost = sumValues(
    stockData,
    (item) => item.stock.cost_price
  );
  const totalQuantity = sumValues(
    stockData,
    (item) => item.stock.current_quantity
  );
  const stockValue = totalProductCost * totalQuantity;
  const totalProductValue = sumValues(stockData, (item) => item.stock.price);
  const stockProfit = (totalProductValue - totalProductCost) * totalQuantity;
  const totalMinStockCount = stockData.filter(
    (item) => item.stock.current_quantity <= item.stock.minimium_quantity
  ).length;
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
      value: totalMinStockCount.toString(),
    },
  ];

  return cardDetails;
}
