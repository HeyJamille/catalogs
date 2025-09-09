// Utils
import { formatCurrency } from "./formatCurrency";

export function MoneyMaskInput({
  setValue,
}: {
  setValue: (value: string) => void;
}) {
  return (e: React.ChangeEvent<HTMLInputElement>) => {
    const digits = e.target.value.replace(/\D/g, "");

    if (!digits) {
      setValue("");
      return;
    }

    const numberValue = parseInt(digits, 10) / 100;

    const formatted = formatCurrency(numberValue);

    setValue(formatted);
  };
}
