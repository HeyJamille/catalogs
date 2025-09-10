// Tipagem
import { ItemsLabels } from "./labels";

export interface StateValue {
  warehouses: string[];
  categories: string[];
  brands: string[];
}

export interface FilterItem {
  id: number;
  title: string;
  name: keyof StateValue;
  data: ItemsLabels[];
}
