import { useEffect, useMemo, useState } from "react";
import { useClients } from "../context/ClientsContext";
import { initials, ROUTINES } from "../data";
import type { Client, Routine } from "../types";

interface RoutineModalProps {
  client: Client;
  onClose: () => void;
}

export default function RoutineModal({ client, onClose }: RoutineModalProps) {
  const { addRoutine, removeRoutine } = useClients();
  const [selected, setSelected] = useState("");

  const assigned = useMemo(
    () =>
      client.routines
        .map((id) => ROUTINES.find((routine) => routine.id === id))
        .filter((routine): routine is Routine => Boolean(routine)),
    [client.routines],
  );

  const available = useMemo(
    () => ROUTINES.filter((routine) => !client.routines.includes(routine.id)),
    [client.routines],
  );

  useEffect(() => {
    if (!available.some((routine) => routine.id === selected)) {
      setSelected(available[0]?.id ?? "");
    }
  }, [available, selected]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [onClose]);

  const handleAdd = () => {
    if (!selected) return;
    addRoutine(client.id, selected);
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center" role="dialog" aria-modal="true">
      <button
        type="button"
        aria-label="Cerrar"
        onClick={onClose}
        className="absolute inset-0 bg-on-surface/40 backdrop-blur-sm"
      />

      <div className="relative w-full sm:max-w-md max-h-[88vh] flex flex-col bg-white/95 backdrop-blur-2xl rounded-t-3xl sm:rounded-3xl shadow-[0_-12px_48px_rgba(30,27,36,0.18)]">
        <div className="flex items-start justify-between px-6 pt-6 pb-4 border-b border-outline-variant/40">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-primary text-on-primary flex items-center justify-center font-label text-sm font-semibold">
              {initials(client.name)}
            </div>
            <div>
              <h2 className="font-display text-lg font-semibold text-on-surface">{client.name}</h2>
              <p className="font-body text-xs text-on-surface-variant">{client.plan}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar ventana"
            className="w-10 h-10 rounded-full flex items-center justify-center text-on-surface-variant hover:text-primary hover:bg-surface-container transition-colors"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <div className="px-6 py-6 overflow-y-auto">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-label text-sm font-semibold text-on-surface">Rutinas asignadas</h3>
            <span className="font-label text-[10px] font-semibold uppercase tracking-wider text-primary">
              {assigned.length} {assigned.length === 1 ? "rutina" : "rutinas"}
            </span>
          </div>

          <div className="flex flex-col gap-2">
            {assigned.length === 0 ? (
              <div className="bg-surface-low rounded-2xl p-5 text-center font-body text-xs text-on-surface-variant">
                Este cliente aún no tiene rutinas. Agrega una desde el selector de abajo.
              </div>
            ) : (
              assigned.map((routine) => (
                <div
                  key={routine.id}
                  className="flex items-center gap-4 bg-surface-low rounded-2xl p-3"
                >
                  <div className="w-10 h-10 rounded-full bg-primary-fixed text-primary flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-[20px]">{routine.icon}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-body text-sm font-semibold text-on-surface truncate">
                      {routine.name}
                    </p>
                    <p className="font-body text-xs text-on-surface-variant truncate">
                      {routine.duration} · {routine.level}
                    </p>
                  </div>
                  <button
                    type="button"
                    title="Quitar rutina"
                    aria-label={`Quitar ${routine.name}`}
                    onClick={() => removeRoutine(client.id, routine.id)}
                    className="w-9 h-9 rounded-full flex items-center justify-center text-on-surface-variant hover:text-error hover:bg-error-container/50 transition-colors shrink-0"
                  >
                    <span className="material-symbols-outlined text-[20px]">delete</span>
                  </button>
                </div>
              ))
            )}
          </div>

          <div className="mt-6 pt-6 border-t border-outline-variant/40">
            <label
              htmlFor="routine-select"
              className="font-label text-[10px] font-semibold uppercase tracking-wider text-on-surface-variant"
            >
              Agregar rutina
            </label>
            <div className="flex gap-2 mt-2">
              <select
                id="routine-select"
                value={selected}
                onChange={(event) => setSelected(event.target.value)}
                disabled={available.length === 0}
                className="flex-1 min-w-0 px-4 py-2.5 rounded-full bg-surface-container border border-outline-variant/60 font-body text-xs text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/30 disabled:opacity-60"
              >
                {available.length === 0 ? (
                  <option value="">No hay más rutinas disponibles</option>
                ) : (
                  available.map((routine) => (
                    <option key={routine.id} value={routine.id}>
                      {routine.name} · {routine.duration}
                    </option>
                  ))
                )}
              </select>
              <button
                type="button"
                onClick={handleAdd}
                disabled={available.length === 0}
                className="px-4 py-2.5 rounded-full bg-primary text-on-primary font-label text-[10px] font-semibold uppercase tracking-wider shadow-[0_4px_14px_rgba(181,5,91,0.25)] active:scale-95 transition-transform shrink-0 disabled:opacity-40 disabled:active:scale-100"
              >
                Agregar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

