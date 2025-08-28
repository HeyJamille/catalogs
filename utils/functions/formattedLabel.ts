// Tipagem
type Option = { id: string; label: string };

export function formatedLabel<T>(
  data: T[],
  idKey: keyof T,
  labelKey: keyof T
): Option[] {
  return data.map((item) => ({
    id: String(item[idKey]),
    label: String(item[labelKey]),
  }));
}
