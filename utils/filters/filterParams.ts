"use client";

// Next
import { useSearchParams } from "next/navigation";

// React
import { useState } from "react";

// Tipagem
import { StateValue } from "@/types/filter";

export function filterParams() {
  const searchParams = useSearchParams();

  const [value, setValue] = useState<StateValue>({
    warehouses: [searchParams.get("warehouse")?.toString() ?? "all"],
    categories: [searchParams.get("category")?.toString() ?? ""],
    brands: [searchParams.get("brand")?.toString() ?? ""],
    is_active: ["all"],
    orderByStock: [searchParams.get("orderByStock")?.toString() ?? ""],
  });

  const query = new URLSearchParams({
    ...(value.warehouses[0] !== "all"
      ? { warehouse: String(value.warehouses) }
      : {}),
    ...(value.categories[0] ? { categories: String(value.categories) } : {}),
    ...(value.brands[0] ? { brands: String(value.brands) } : {}),
    ...(value.orderByStock ? { orderByStock: String(value.orderByStock) } : {}),
    ...(String(value.is_active) !== "all"
      ? { is_active: String(value.is_active) }
      : {}),
  }).toString();

  return { value, query, setValue };
}
