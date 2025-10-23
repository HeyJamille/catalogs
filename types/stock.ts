// Tipagem
import { bannerItems } from "./banner";

export type stockItems = {
  id: string;
  banners: bannerItems[];
  name: string;
  description: string;
  product_code: string;
  sales_unit: string;
  brand: {
    id: string;
    name: string;
  };
  category: {
    id: string;
    name: string;
  };
  is_active: boolean;
  date_of_inactivation: Date;
  created_at: Date;
  updated_at: Date;
  stock: {
    id: string;
    warehouse_id: string;
    current_quantity: number;
    minimium_quantity: number;
    maximum_quantity: number;
    price: number;
    purchase_price: number;
    cost_price: number;
    has_discount: boolean;
    discount_percentage: string;
    created_at: Date;
    updated_at: Date;
    warehouse_name: string;
  };
};
