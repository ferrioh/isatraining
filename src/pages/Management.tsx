import { useMemo, useState } from "react";
import { useClients } from "../context/ClientsContext";
import { initials, STATUS_META } from "../data";
import type { ClientStatus } from "../types";

type Filter = "all" | ClientStatus;

const FILTERS: { id: Filter; label: string }[] = [
  { id: "all", label: "Todas" },
  { id: "paid", label: "Al día" },
  { id: "pending", label: "Por vencer" },
  { id: "overdue", label: "Vencidos" },
];

const AMOUNTS: Record<number, number> = {
  1: 180000,
  2: 90000,
  3: 220000,
  4: 90000,
  5: 180000,
  6: 90000,
};

function formatCLP(value: number) {
  return new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
    maximumFractionDigits: 0,
  }).format(value);
}

export default function Management() {
  const { clients } = useClients();
  const [filter, setFilter] = useState<Filter>("all");

  const counts = useMemo(
    () => ({
      paid: clients.filter((client) => client.status === "paid").length,
      pending: clients.filter((client) => client.status === "pending").length,
      overdue: clients.filter((client) => client.status === "overdue").length,
    }),
    [clients],
  );

  const filtered = useMemo(
    () => (filter === "all" ? clients : clients.filter((client) => client.status === filter)),
    [clients, filter],
  );

  return (
    <div className="flex flex-col gap-5">
      <div>
        <h2 className="font-display text-xl font-semibold text-on-surface">Clientes y pagos</h2>
        <p className="font-body text-xs text-on-surface-variant">
          Estado de membresías y cobros del atelier
        </p>
      </div>

      <div className="grid grid-cols-3 gap-2">
        <div className="rounded-2xl bg-white/90 backdrop-blur-xl p-3 shadow-[0_6px_20px_rgba(0,0,0,0.04)]">
          <span className="block font-label text-[9px] font-semibold uppercase tracking-wider text-on-surface-variant">
            Al día
          </span>
          <span className="font-label text-2xl font-bold text-success">{counts.paid}</span>
        </div>
        <div className="rounded-2xl bg-white/90 backdrop-blur-xl p-3 shadow-[0_6px_20px_rgba(0,0,0,0.04)]">
          <span className="block font-label text-[9px] font-semibold uppercase tracking-wider text-on-surface-variant">
            Por vencer
          </span>
          <span className="font-label text-2xl font-bold text-primary">{counts.pending}</span>
        </div>
        <div className="rounded-2xl bg-white/90 backdrop-blur-xl p-3 shadow-[0_6px_20px_rgba(0,0,0,0.04)]">
          <span className="block font-label text-[9px] font-semibold uppercase tracking-wider text-on-surface-variant">
            Vencidos
          </span>
          <span className="font-label text-2xl font-bold text-error">{counts.overdue}</span>
        </div>
      </div>

      <div className="flex gap-2 overflow-x-auto -mx-5 px-5 pb-1">
        {FILTERS.map((item) => {
          const isActive = item.id === filter;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setFilter(item.id)}
              className={`shrink-0 px-4 py-2 rounded-full font-label text-[10px] font-semibold uppercase tracking-wider transition-all ${
                isActive
                  ? "bg-primary text-on-primary shadow-[0_4px_14px_rgba(181,5,91,0.25)]"
                  : "bg-white/80 text-on-surface-variant"
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </div>

      <div className="flex flex-col gap-3">
        {filtered.map((client) => {
          const meta = STATUS_META[client.status];
          const amount = AMOUNTS[client.id] ?? 90000;
          return (
            <article
              key={client.id}
              className="rounded-3xl bg-white/90 backdrop-blur-xl p-5 shadow-[0_8px_24px_rgba(0,0,0,0.04)] flex flex-col gap-3"
            >
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-full bg-secondary-container text-primary flex items-center justify-center font-label text-sm font-semibold shrink-0">
                  {initials(client.name)}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-display text-base font-semibold text-on-surface truncate">
                    {client.name}
                  </h3>
                  <p className="font-body text-xs text-on-surface-variant truncate">{client.plan}</p>
                </div>
                <div className="flex flex-col items-end shrink-0">
                  <span className="font-label text-sm font-bold text-on-surface">
                    {formatCLP(amount)}
                  </span>
                  <span
                    className={`mt-1 px-2 py-0.5 rounded-full font-label text-[9px] font-semibold uppercase tracking-wider ${meta.className}`}
                  >
                    {meta.label}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-3 border-t border-outline-variant/40">
                <a
                  href="https://wa.me/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 h-9 rounded-full bg-success text-white font-label text-[9px] font-semibold uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-[0_4px_14px_rgba(5,150,105,0.25)]"
                >
                  <span className="material-symbols-outlined text-[16px]">chat</span>
                  Cobrar WhatsApp
                </a>
                <button
                  type="button"
                  className="flex-1 h-9 rounded-full bg-surface-container text-on-surface font-label text-[9px] font-semibold uppercase tracking-wider flex items-center justify-center gap-1.5"
                >
                  <span className="material-symbols-outlined text-[16px]">receipt_long</span>
                  Comprobante
                </button>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
