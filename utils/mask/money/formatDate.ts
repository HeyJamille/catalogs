export function formatDate(data: Date) {
  const formatter = new Intl.DateTimeFormat("pt-BR");

  return formatter.format(new Date(data));
}
