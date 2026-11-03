export function getWsUrl(): string | null {
  const configured = (import.meta.env.VITE_WS_URL as string | undefined)?.trim();
  if (configured) return configured;

  if (import.meta.env.DEV) {
    return "ws://localhost:8080/ws";
  }

  if (typeof window !== "undefined") {
    const protocol = window.location.protocol === "https:" ? "wss:" : "ws:";
    return `${protocol}//${window.location.host}/ws`;
  }

  return null;
}
