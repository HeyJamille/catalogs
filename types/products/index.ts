export interface Product {
  id: string;
  name: string;
  brand: string;
  category: "water" | "soda" | "other";
  price: number;
  stock: number;
  description?: string;
  createdAt: Date;
}

export interface Sale {
  id: string;
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  totalAmount: number;
  customerName?: string;
  saleDate: Date;
}

export interface DashboardStats {
  totalSales: number;
  totalRevenue: number;
  totalProducts: number;
  lowStockProducts: number;
  todaySales: number;
  weeklyRevenue: number;
  topSellingProduct: string;
}
