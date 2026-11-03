import { initials, STATUS_META } from "../data";
import type { Client } from "../types";

interface ClientCardProps {
  client: Client;
  onOpen: (id: number) => void;
}

export default function ClientCard({ client, onOpen }: ClientCardProps) {
  const status = STATUS_META[client.status];
  const routineCount = client.routines.length;
  const routineLabel = routineCount === 1 ? "1 rutina" : `${routineCount} rutinas`;

  return (
    <article className="bg-white/90 backdrop-blur-xl rounded-3xl p-5 shadow-[0_8px_24px_rgba(0,0,0,0.04)] flex flex-col">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-secondary-container text-primary flex items-center justify-center font-label text-sm font-semibold shrink-0">
          {initials(client.name)}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-display text-lg font-semibold text-on-surface truncate">{client.name}</h3>
          <p className="font-body text-xs text-on-surface-variant truncate">{client.plan}</p>
        </div>
        <span
          className={`px-2.5 py-1 rounded-full font-label text-[10px] font-semibold uppercase tracking-wider shrink-0 ${status.className}`}
        >
          {status.label}
        </span>
      </div>

      <div className="flex items-center justify-between mt-4 pt-4 border-t border-outline-variant/40">
        <div className="flex items-center gap-1.5 text-on-surface-variant">
          <span className="material-symbols-outlined text-[18px] text-primary">fitness_center</span>
          <span className="font-label text-[10px] font-semibold uppercase tracking-wider">
            {routineLabel}
          </span>
        </div>
        <button
          type="button"
          onClick={() => onOpen(client.id)}
          className="flex items-center gap-1 px-4 py-2 rounded-full bg-primary text-on-primary font-label text-[10px] font-semibold uppercase tracking-wider shadow-[0_4px_14px_rgba(181,5,91,0.22)] active:scale-95 transition-transform"
        >
          Ver rutinas
          <span className="material-symbols-outlined text-[16px]">chevron_right</span>
        </button>
      </div>
    </article>
  );
}
