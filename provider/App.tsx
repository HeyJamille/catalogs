"use client";

import React, { createContext, useContext, ReactNode } from "react";
import { Product, Sale, DashboardStats } from "../types/products/index";
import { useLocalStorage } from "../hooks/useLocalStorage";

interface AppContextType {
  products: Product[];
  sales: Sale[];
  addProduct: (product: Omit<Product, "id" | "createdAt">) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  addSale: (sale: Omit<Sale, "id" | "saleDate">) => void;
  getDashboardStats: () => DashboardStats;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const initialProducts: Product[] = [
  {
    id: "1",
    name: "Água Mineral 500ml",
    brand: "Crystal",
    category: "water",
    price: 2.5,
    stock: 100,
    description: "Água mineral natural sem gás",
    createdAt: new Date(),
  },
  {
    id: "2",
    name: "Coca-Cola 350ml",
    brand: "Coca-Cola",
    category: "soda",
    price: 4.5,
    stock: 75,
    description: "Refrigerante tradicional",
    createdAt: new Date(),
  },
];

export function AppProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useLocalStorage<Product[]>(
    "products",
    initialProducts
  );
  const [sales, setSales] = useLocalStorage<Sale[]>("sales", []);

  const addProduct = (productData: Omit<Product, "id" | "createdAt">) => {
    const newProduct: Product = {
      ...productData,
      id: Date.now().toString(),
      createdAt: new Date(),
    };
    setProducts((prev) => [...prev, newProduct]);
  };

  const updateProduct = (id: string, productUpdate: Partial<Product>) => {
    setProducts((prev) =>
      prev.map((product) =>
        product.id === id ? { ...product, ...productUpdate } : product
      )
    );
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((product) => product.id !== id));
  };

  const addSale = (saleData: Omit<Sale, "id" | "saleDate">) => {
    const newSale: Sale = {
      ...saleData,
      id: Date.now().toString(),
      saleDate: new Date(),
    };
    setSales((prev) => [...prev, newSale]);

    // Update product stock
    updateProduct(saleData.productId, {
      stock:
        products.find((p) => p.id === saleData.productId)!.stock -
        saleData.quantity,
    });
  };

  const getDashboardStats = (): DashboardStats => {
    const today = new Date();
    const todayStr = today.toDateString();
    const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);

    const todaySales = sales.filter(
      (sale) => new Date(sale.saleDate).toDateString() === todayStr
    ).length;

    const weeklyRevenue = sales
      .filter((sale) => new Date(sale.saleDate) >= weekAgo)
      .reduce((total, sale) => total + sale.totalAmount, 0);

    const productSales = sales.reduce(
      (acc, sale) => {
        acc[sale.productName] = (acc[sale.productName] || 0) + sale.quantity;
        return acc;
      },
      {} as Record<string, number>
    );

    const topSellingProduct =
      Object.entries(productSales).sort(([, a], [, b]) => b - a)[0]?.[0] ||
      "Nenhum";

    return {
      totalSales: sales.length,
      totalRevenue: sales.reduce((total, sale) => total + sale.totalAmount, 0),
      totalProducts: products.length,
      lowStockProducts: products.filter((p) => p.stock < 10).length,
      todaySales,
      weeklyRevenue,
      topSellingProduct,
    };
  };

  const value = {
    products,
    sales,
    addProduct,
    updateProduct,
    deleteProduct,
    addSale,
    getDashboardStats,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}
