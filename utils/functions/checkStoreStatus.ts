function toMinutesSinceMidnight(source: string): number {
  if (source.includes("T")) {
    const d = new Date(source);
    if (isNaN(d.getTime())) throw new Error(`Horário inválido: ${source}`);

    const useUtc = /Z$/i.test(source);
    const h = useUtc ? d.getUTCHours() : d.getHours();
    const m = useUtc ? d.getUTCMinutes() : d.getMinutes();
    return h * 60 + m;
  }

  const m = source.match(/^(\d{1,2}):(\d{2})$/);
  if (!m) throw new Error(`Esperado "HH:mm" ou ISO; recebido: ${source}`);
  return Number(m[1]) * 60 + Number(m[2]);
}

export default function CheckStoreStatus(
  openingTime: string,
  closingTime: string,
  now: Date = new Date()
): boolean {
  const openM = toMinutesSinceMidnight(openingTime);
  const closeM = toMinutesSinceMidnight(closingTime);
  const nowM = now.getHours() * 60 + now.getMinutes();

  if (openM === closeM) return false;

  if (closeM > openM) {
    return nowM >= openM && nowM < closeM;
  } else {
    return nowM >= openM || nowM < closeM;
  }
}
