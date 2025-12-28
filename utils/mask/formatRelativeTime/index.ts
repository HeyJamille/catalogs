export function formatRelativeTime(time: number) {
  const now = Date.now();
  const msgTime = time * 1000;

  const diff = now - msgTime;
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (seconds < 10) return "agora";
  if (seconds < 60) return `${seconds}s`;

  if (minutes < 60) return `${minutes}m`;

  if (hours < 24) return `${hours}h`;

  if (days === 1) return "ontem";
  if (days < 7) return `${days}d`;

  const date = new Date(msgTime);
  return date.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "short",
  });
}
