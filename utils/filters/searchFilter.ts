// Tipagem
interface SearchFilterProps<T extends Record<string, any>> {
  data: T[];
  search: string;
  filterBy?: keyof T;
}

export function searchFilter<T extends Record<string, any>>({
  data,
  search,
  filterBy,
}: SearchFilterProps<T>) {
  if (!search) return data;

  return data.filter((item) => {
    if (filterBy) {
      const value = item[filterBy];
      if (typeof value === "string") {
        return value.toLowerCase().includes(search.toLowerCase());
      }
    } else {
      return Object.values(item).some((value) => {
        if (typeof value === "string") {
          return value.toLowerCase().includes(search.toLowerCase());
        }
        if (typeof value === "object" && value !== null) {
          return Object.values(value).some(
            (subValue) =>
              typeof subValue === "string" &&
              subValue.toLowerCase().includes(search.toLowerCase())
          );
        }
        return false;
      });
    }
    return false;
  });
}
