"use client";

// React
import { TransitionStartFunction } from "react";

// Bibliotecas
import { Chip, User } from "@heroui/react";
import { Package2 } from "lucide-react";

// Utils
import { formatCurrency } from "../../../utils/mask/money/formatCurrency";
import { formatDate } from "@/utils/mask/money/formatDate";

// Tipagem
import { stockItems } from "../../../types/stock";

// Components
import ActionsCell from "@/components/ui/admin/actionsCell";

export const renderCell = (
  item: stockItems,
  columnKey: string,
  setLoading: TransitionStartFunction
) => {
  const myStockIsLow =
    item.stock.current_quantity <= item.stock.minimium_quantity;

  switch (columnKey) {
    case "name":
      return (
        <User
          avatarProps={{
            radius: "md",
            size: "md",
            src: item?.url_imagem || undefined,
            icon: <Package2 className="w-5 h-5" />,
            color: "primary",
          }}
          classNames={{
            base: "",
            name: `${myStockIsLow && "text-red-400"} text-sm w-[10em] truncate`,
            description: `text-sm w-[10em] truncate ${myStockIsLow ? "text-red-300" : "text-gray-400"} `,
          }}
          name={item.name}
          description={item.description}
        />
      );
    case "product_code":
      return (
        <p
          className={`${myStockIsLow && "text-red-500"} text-bold truncate w-[8em] text-small capitalize`}
        >
          {item.product_code}
        </p>
      );
    case "stock.warehouse_name":
      return (
        <p
          className={`${myStockIsLow && "text-red-500"} text-bold truncate w-[8em] text-small capitalize`}
        >
          {item.stock.warehouse_name}
        </p>
      );
    case "brand":
      return (
        <p
          className={`${myStockIsLow && "text-red-500"} text-bold text-small capitalize`}
        >
          {(item as any).brand}
        </p>
      );
    case "category":
      return (
        <p
          className={`${myStockIsLow && "text-red-500"} text-bold text-small capitalize`}
        >
          {(item as any).category}
        </p>
      );
    case "is_active":
      return (
        <Chip
          classNames={{ content: "capitalize font-bold" }}
          color={item.is_active ? "primary" : "danger"}
          size="sm"
          variant="flat"
        >
          {item.is_active ? "Sim" : "Não"}
        </Chip>
      );
    case "stock.price":
      return (
        <p
          className={`${myStockIsLow && "text-red-500"} font-semibold text-small capitalize`}
        >
          {formatCurrency(item.stock.price)}
        </p>
      );
    case "stock.purchase_price":
      return (
        <p
          className={`${myStockIsLow && "text-red-500"} font-semibold text-small capitalize`}
        >
          {formatCurrency(item.stock.purchase_price)}
        </p>
      );
    case "stock.cost_price":
      return (
        <p
          className={`${myStockIsLow && "text-red-500"} font-semibold text-small capitalize`}
        >
          {formatCurrency(item.stock.cost_price)}
        </p>
      );
    case "cost_of_goods":
      const costOfGoods = item.stock.cost_price * item.stock.current_quantity;

      return (
        <p
          className={`${myStockIsLow && "text-red-500"} font-semibold text-small capitalize`}
        >
          {formatCurrency(costOfGoods)}
        </p>
      );
    case "stock.current_quantity":
      return (
        <p
          className={`${myStockIsLow && "text-red-500"} text-bold text-small capitalize`}
        >
          {item.stock.current_quantity}
        </p>
      );
    case "stock.minimium_quantity":
      return (
        <p
          className={`${myStockIsLow && "text-red-500"} text-bold text-small capitalize`}
        >
          {item.stock.current_quantity}
        </p>
      );
    case "stock.maximum_quantity":
      return (
        <p
          className={`${myStockIsLow && "text-red-500"} text-bold text-small capitalize`}
        >
          {item.stock.maximum_quantity}
        </p>
      );
    case "date_of_inactivation":
      return (
        <p
          className={`${myStockIsLow && "text-red-500"} text-bold text-small capitalize`}
        >
          {item.date_of_inactivation
            ? formatDate(item.date_of_inactivation)
            : "-"}
        </p>
      );
    case "stock.has_discount":
      return (
        <Chip
          classNames={{ content: "capitalize font-bold" }}
          color={item.stock.has_discount ? "primary" : "danger"}
          size="sm"
          variant="flat"
        >
          {item.stock.has_discount ? "Sim" : "Não"}
        </Chip>
      );
    case "created_at":
      return (
        <p
          className={`${myStockIsLow && "text-red-500"} text-bold text-small capitalize`}
        >
          {formatDate(item.created_at)}
        </p>
      );
    case "sales_unit":
      return (
        <p
          className={`${myStockIsLow && "text-red-500"} text-bold text-small capitalize`}
        >
          {item.sales_unit}
        </p>
      );
    case "stock.discount_percentage":
      return (
        <p
          className={`${myStockIsLow && "text-red-500"} text-bold text-small capitalize`}
        >
          {item.stock.discount_percentage} %
        </p>
      );
    case "actions":
      return (
        <ActionsCell
          id={item.id}
          endpoint="/stocks"
          hrfeEdit="/stock/edit"
          setLoadingUI={setLoading}
        />
      );
  }
};
