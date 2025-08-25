export function sumValues<T>(
  data: T[],
  getValue: (item: T) => number | undefined
) {
  const total = data.reduce((acc: number, item: T) => {
    const value = getValue(item);
    if (!value) return acc;

    return acc + (isNaN(value) ? 0 : value);
  }, 0);

  return parseFloat(total.toFixed(2));
}
