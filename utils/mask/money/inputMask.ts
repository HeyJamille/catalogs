// Utils
import { formatCurrency } from "./formatCurrency";

export function MoneyMaskInput({
  setValue,
}: {
  setValue: (value: string) => void;
}) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    value = value.replace(/[^\d,]/g, "");
    const numericValue = parseFloat(value.replace(",", "."));

    if (isNaN(numericValue)) {
      setValue("");
    } else {
      const formattedValue = formatCurrency(numericValue);
      setValue(formattedValue);
    }
  };

  return handleChange;
}
