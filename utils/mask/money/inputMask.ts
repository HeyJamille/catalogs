// Utils
import { formatCurrency } from "./formatCurrency";

export function MoneyMaskInput({
  setValue,
}: {
  setValue: (value: string) => void;
}) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let value = event.target.value;
    value = value.replace(/[^\d,]/g, "");
    const numericValue = parseFloat(value.replace(",", "."));

    if (isNaN(numericValue)) {
      setValue("");
    } else {
      const formattedValue = formatCurrency(numericValue);
      setValue(formattedValue);
    }
  };

  return { handleChange };
}
