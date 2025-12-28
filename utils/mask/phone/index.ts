export function formatPhone(value: string) {
  const cleaned = value.replace(/[^\d+]/g, "");

  if (!cleaned.startsWith("+55")) return value;

  const onlyDigits = cleaned.replace("+55", "");
  const digits = onlyDigits.replace(/\D/g, "");
  const ddd = digits.slice(0, 2);
  const rest = digits.slice(2);
  if (ddd.length < 2) return `+55 (${ddd}`;
  if (rest.length <= 8) {
    const part1 = rest.slice(0, 4);
    const part2 = rest.slice(4, 8);

    return `+55 (${ddd}) ${part1}${part2 ? "-" + part2 : ""}`;
  }

  const part1 = rest.slice(0, 5);
  const part2 = rest.slice(5, 9);

  return `+55 (${ddd}) ${part1}${part2 ? "-" + part2 : ""}`;
}
