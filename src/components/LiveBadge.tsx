import { useClients } from "../context/ClientsContext";

export default function LiveBadge() {
  const { mode, online } = useClients();
  const isLive = mode === "ws";

  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-white/70 px-2.5 py-1 font-label text-[10px] font-semibold uppercase tracking-wider text-on-surface-variant">
      <span
        className={`h-2 w-2 rounded-full ${
          isLive
            ? "bg-emerald-500 animate-pulse"
            : mode === "connecting"
              ? "bg-amber-400 animate-pulse"
              : "bg-primary/60"
        }`}
      />
      {isLive ? `En vivo · ${online}` : mode === "connecting" ? "Conectando" : "Modo local"}
    </span>
  );
}
