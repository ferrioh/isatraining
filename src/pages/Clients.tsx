import { useMemo, useState } from "react";
import ClientCard from "../components/ClientCard";
import LiveBadge from "../components/LiveBadge";
import RoutineModal from "../components/RoutineModal";
import { useClients } from "../context/ClientsContext";

export default function Clients() {
  const { clients, totalRoutines } = useClients();
  const [query, setQuery] = useState("");
  const [activeId, setActiveId] = useState<number | null>(null);

  const filtered = useMemo(() => {
    const term = query.toLowerCase().trim();
    if (!term) return clients;
    return clients.filter(
      (client) =>
        client.name.toLowerCase().includes(term) || client.plan.toLowerCase().includes(term),
    );
  }, [clients, query]);

  const activeClient = clients.find((client) => client.id === activeId) ?? null;

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="font-display text-xl font-semibold text-on-surface">Clientes</h2>
          <p className="font-body text-xs text-on-surface-variant">
            Sincronización en tiempo real de rutinas
          </p>
        </div>
        <LiveBadge />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-3xl bg-white/90 backdrop-blur-xl p-4 shadow-[0_6px_20px_rgba(0,0,0,0.04)] flex flex-col">
          <span className="font-label text-[10px] font-semibold uppercase tracking-wider text-on-surface-variant">
            Clientes
          </span>
          <span className="font-label text-3xl font-bold tracking-tight text-primary">
            {clients.length}
          </span>
        </div>
        <div className="rounded-3xl bg-white/90 backdrop-blur-xl p-4 shadow-[0_6px_20px_rgba(0,0,0,0.04)] flex flex-col">
          <span className="font-label text-[10px] font-semibold uppercase tracking-wider text-on-surface-variant">
            Rutinas asignadas
          </span>
          <span className="font-label text-3xl font-bold tracking-tight text-tertiary">
            {totalRoutines}
          </span>
        </div>
      </div>

      <div className="relative">
        <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[20px] text-on-surface-variant">
          search
        </span>
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Buscar cliente o plan..."
          autoComplete="off"
          className="w-full pl-12 pr-4 py-3.5 rounded-full bg-white/90 border border-outline-variant/60 font-body text-sm text-on-surface placeholder:text-on-surface-variant/60 focus:outline-none focus:ring-2 focus:ring-primary/30"
        />
      </div>

      <div className="flex items-center justify-between">
        <h3 className="font-display text-base font-semibold text-on-surface">Lista de clientes</h3>
        <span className="font-label text-[10px] font-semibold uppercase tracking-wider text-on-surface-variant">
          Toca para ver rutinas
        </span>
      </div>

      <div className="flex flex-col gap-3">
        {filtered.length === 0 ? (
          <div className="rounded-3xl bg-white/90 backdrop-blur-xl p-8 text-center flex flex-col items-center gap-2">
            <span className="material-symbols-outlined text-[40px] text-on-surface-variant">
              search_off
            </span>
            <p className="font-body text-sm text-on-surface-variant">
              No encontramos clientes con ese criterio.
            </p>
          </div>
        ) : (
          filtered.map((client) => (
            <ClientCard key={client.id} client={client} onOpen={setActiveId} />
          ))
        )}
      </div>

      {activeClient ? (
        <RoutineModal client={activeClient} onClose={() => setActiveId(null)} />
      ) : null}
    </div>
  );
}
