import { useMemo, useState } from "react";
import { WEEK } from "../data";

export default function Routines() {
  const [selectedDay, setSelectedDay] = useState(WEEK[0].id);
  const [completed, setCompleted] = useState<Record<string, boolean>>({});
  const [started, setStarted] = useState(false);

  const day = useMemo(() => WEEK.find((item) => item.id === selectedDay) ?? WEEK[0], [selectedDay]);
  const doneCount = day.exercises.filter((exercise) => completed[`${day.id}-${exercise.name}`]).length;

  const toggleExercise = (name: string) => {
    const key = `${day.id}-${name}`;
    setCompleted((current) => ({ ...current, [key]: !current[key] }));
  };

  return (
    <div className="flex flex-col gap-5">
      <section className="flex flex-col gap-3">
        <div>
          <h2 className="font-display text-xl font-semibold text-on-surface">Rutinas de la semana</h2>
          <p className="font-body text-xs text-on-surface-variant">
            Tu plan activo · Semana 4 de 8
          </p>
        </div>

        <div className="flex gap-2 overflow-x-auto -mx-5 px-5 pb-1">
          {WEEK.map((item) => {
            const isActive = item.id === selectedDay;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setSelectedDay(item.id)}
                className={`min-w-[62px] rounded-2xl px-3 py-2.5 flex flex-col items-center gap-0.5 transition-all ${
                  isActive
                    ? "bg-primary text-on-primary shadow-[0_6px_16px_rgba(181,5,91,0.25)]"
                    : "bg-white/80 text-on-surface-variant"
                }`}
              >
                <span className="font-label text-[10px] font-semibold uppercase tracking-wider">
                  {item.day}
                </span>
                <span className="font-label text-lg font-bold leading-none">{item.date}</span>
              </button>
            );
          })}
        </div>
      </section>

      <section className="rounded-3xl bg-white/90 backdrop-blur-xl p-5 shadow-[0_8px_24px_rgba(0,0,0,0.04)] flex flex-col gap-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex flex-col">
            <span className="font-label text-[10px] font-semibold uppercase tracking-wider text-primary">
              {day.focus}
            </span>
            <h3 className="font-display text-xl font-semibold text-on-surface">{day.title}</h3>
          </div>
          <span className="rounded-full bg-secondary-container px-2.5 py-1 font-label text-[10px] font-semibold uppercase tracking-wider text-on-secondary-container">
            {doneCount}/{day.exercises.length}
          </span>
        </div>

        <div className="flex flex-col gap-2">
          {day.exercises.map((exercise) => {
            const key = `${day.id}-${exercise.name}`;
            const isDone = Boolean(completed[key]);
            return (
              <button
                key={exercise.name}
                type="button"
                onClick={() => toggleExercise(exercise.name)}
                className={`flex items-center gap-3 rounded-2xl p-3 text-left transition-colors ${
                  isDone ? "bg-primary-fixed/70" : "bg-surface-low"
                }`}
              >
                <span
                  className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                    isDone ? "bg-primary text-on-primary" : "bg-white text-primary"
                  }`}
                >
                  <span className="material-symbols-outlined text-[20px]">
                    {isDone ? "check" : exercise.icon}
                  </span>
                </span>
                <span className="flex-1 min-w-0">
                  <span
                    className={`block font-body text-sm font-semibold truncate ${
                      isDone ? "text-on-primary-fixed line-through" : "text-on-surface"
                    }`}
                  >
                    {exercise.name}
                  </span>
                  <span className="block font-body text-xs text-on-surface-variant">
                    {exercise.detail}
                  </span>
                </span>
                <span className="material-symbols-outlined text-[20px] text-on-surface-variant">
                  {isDone ? "done_all" : "radio_button_unchecked"}
                </span>
              </button>
            );
          })}
        </div>

        <button
          type="button"
          onClick={() => setStarted((value) => !value)}
          className={`w-full py-3 rounded-full font-label text-[11px] font-semibold uppercase tracking-wider transition-transform active:scale-95 ${
            started
              ? "bg-success-container text-success"
              : "bg-primary text-on-primary shadow-[0_6px_16px_rgba(181,5,91,0.25)]"
          }`}
        >
          {started ? "Sesión iniciada" : "Iniciar hoy"}
        </button>
      </section>

      <section className="rounded-3xl bg-white/70 backdrop-blur-xl p-5 shadow-[0_6px_20px_rgba(0,0,0,0.03)]">
        <p className="font-body text-xs text-on-surface-variant">
          Tip de Coach Isa: mantén una sobrecarga progresiva constante y prioriza la técnica sobre la
          carga. La constancia crea tu mejor versión.
        </p>
      </section>
    </div>
  );
}
