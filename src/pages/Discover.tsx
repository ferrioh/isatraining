import { useNavigate } from "react-router-dom";
import { ROUTINES } from "../data";

export default function Discover() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-6">
      <section className="relative overflow-hidden rounded-3xl bg-white/90 backdrop-blur-xl p-5 shadow-[0_12px_36px_rgba(224,53,122,0.06)]">
        <div className="absolute inset-0 bg-gradient-to-br from-secondary-container/60 via-transparent to-transparent pointer-events-none" />
        <div className="relative flex flex-col gap-3">
          <span className="inline-flex w-fit items-center gap-1 rounded-full bg-primary-fixed px-2.5 py-1 font-label text-[10px] font-semibold uppercase tracking-wider text-on-primary-fixed">
            <span className="material-symbols-outlined text-[14px]">verified</span>
            Atelier Privé
          </span>
          <h2 className="font-display text-2xl font-semibold leading-tight text-on-surface">
            Hola, Bella.
            <br />
            <span className="text-primary">Esculpe tu mejor versión.</span>
          </h2>
          <p className="font-body text-sm text-on-surface-variant">
            Fuerza, técnica y postura con entrenamiento de precisión y alta costura corporal.
          </p>
          <div className="flex flex-wrap gap-2 mt-1">
            <button
              type="button"
              onClick={() => navigate("/perfil")}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-primary text-on-primary font-label text-[10px] font-semibold uppercase tracking-wider shadow-[0_6px_16px_rgba(181,5,91,0.28)] active:scale-95 transition-transform"
            >
              Conóceme
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </button>
            <button
              type="button"
              onClick={() => window.open("https://wa.me/", "_blank", "noopener,noreferrer")}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-secondary-container text-on-secondary-container font-label text-[10px] font-semibold uppercase tracking-wider active:scale-95 transition-transform"
            >
              Agendar
              <span className="material-symbols-outlined text-[16px]">calendar_add_on</span>
            </button>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-2 gap-3">
        <div className="rounded-3xl bg-white/90 backdrop-blur-xl p-4 shadow-[0_6px_20px_rgba(0,0,0,0.04)] flex flex-col gap-1">
          <span className="font-label text-[10px] font-semibold uppercase tracking-wider text-on-surface-variant">
            Actividad hoy
          </span>
          <span className="font-label text-3xl font-bold tracking-tight text-primary">
            1,420
            <span className="ml-1 text-xs font-medium text-on-surface-variant">kcal</span>
          </span>
          <span className="flex items-center gap-1 font-label text-[10px] font-semibold uppercase tracking-wider text-success">
            <span className="material-symbols-outlined text-[14px]">trending_up</span>
            +18% vs ayer
          </span>
        </div>
        <div className="rounded-3xl bg-white/90 backdrop-blur-xl p-4 shadow-[0_6px_20px_rgba(0,0,0,0.04)] flex flex-col gap-1">
          <span className="font-label text-[10px] font-semibold uppercase tracking-wider text-on-surface-variant">
            Plan activo
          </span>
          <span className="font-label text-3xl font-bold tracking-tight text-tertiary">
            4
            <span className="text-xs font-medium text-on-surface-variant"> / 8</span>
          </span>
          <div className="h-1.5 rounded-full bg-secondary-container overflow-hidden">
            <div className="h-full w-1/2 rounded-full bg-primary" />
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-3">
        <h3 className="font-display text-lg font-semibold text-on-surface">Programas 2025</h3>
        <div className="flex flex-col gap-3">
          <article className="rounded-3xl bg-white/90 backdrop-blur-xl p-5 shadow-[0_8px_24px_rgba(0,0,0,0.04)] flex items-start gap-4">
            <div className="w-11 h-11 rounded-full bg-primary-fixed text-primary flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined">fitness_center</span>
            </div>
            <div className="flex-1 flex flex-col gap-1">
              <span className="font-label text-[10px] font-semibold uppercase tracking-wider text-primary">
                Presencial
              </span>
              <h4 className="font-display text-base font-semibold text-on-surface">Atelier Presencial</h4>
              <p className="font-body text-xs text-on-surface-variant">
                Atención 1-a-1 en gimnasio privado, corrección milimétrica y análisis biomecánico.
              </p>
              <button
                type="button"
                onClick={() => window.open("https://wa.me/", "_blank", "noopener,noreferrer")}
                className="mt-2 self-start px-3.5 py-2 rounded-full bg-primary text-on-primary font-label text-[10px] font-semibold uppercase tracking-wider active:scale-95 transition-transform"
              >
                Agendar evaluación
              </button>
            </div>
          </article>

          <article className="rounded-3xl bg-white/90 backdrop-blur-xl p-5 shadow-[0_8px_24px_rgba(0,0,0,0.04)] flex items-start gap-4">
            <div className="w-11 h-11 rounded-full bg-secondary-container text-primary flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined">workspace_premium</span>
            </div>
            <div className="flex-1 flex flex-col gap-1">
              <span className="font-label text-[10px] font-semibold uppercase tracking-wider text-tertiary">
                Online VIP
              </span>
              <h4 className="font-display text-base font-semibold text-on-surface">Programa Online VIP</h4>
              <p className="font-body text-xs text-on-surface-variant">
                Rutinas guiadas en video, feedback diario 24/7 y pautas nutricionales flexibles.
              </p>
              <button
                type="button"
                onClick={() => navigate("/rutinas")}
                className="mt-2 self-start px-3.5 py-2 rounded-full bg-primary-container text-on-primary font-label text-[10px] font-semibold uppercase tracking-wider active:scale-95 transition-transform"
              >
                Comenzar ahora
              </button>
            </div>
          </article>
        </div>
      </section>

      <section className="flex flex-col gap-3">
        <div className="flex items-end justify-between">
          <div className="flex flex-col">
            <span className="font-label text-[10px] font-semibold uppercase tracking-wider text-primary">
              Masterclasses
            </span>
            <h3 className="font-display text-lg font-semibold text-on-surface">Rutinas destacadas</h3>
          </div>
          <button
            type="button"
            onClick={() => navigate("/rutinas")}
            className="flex items-center gap-0.5 font-label text-[10px] font-semibold uppercase tracking-wider text-primary"
          >
            Ver todas
            <span className="material-symbols-outlined text-[16px]">chevron_right</span>
          </button>
        </div>

        <div className="flex gap-3 overflow-x-auto -mx-5 px-5 pb-1 snap-x">
          {ROUTINES.map((routine) => (
            <article
              key={routine.id}
              className="min-w-[220px] max-w-[220px] snap-center rounded-3xl bg-white/90 backdrop-blur-xl shadow-[0_8px_24px_rgba(0,0,0,0.05)] p-4 flex flex-col gap-2"
            >
              <div className="flex items-center justify-between">
                <div className="w-9 h-9 rounded-full bg-primary-fixed text-primary flex items-center justify-center">
                  <span className="material-symbols-outlined text-[20px]">{routine.icon}</span>
                </div>
                <span className="font-label text-[10px] font-semibold uppercase tracking-wider text-on-surface-variant">
                  {routine.duration}
                </span>
              </div>
              <h4 className="font-display text-base font-semibold text-on-surface leading-tight">
                {routine.name}
              </h4>
              <p className="font-body text-xs text-on-surface-variant">{routine.focus}</p>
              <div className="flex items-center gap-2 mt-1 font-label text-[10px] font-semibold uppercase tracking-wider text-on-surface-variant">
                <span className="flex items-center gap-0.5 text-primary">
                  <span className="material-symbols-outlined text-[14px]">local_fire_department</span>
                  {routine.kcal}
                </span>
                <span>·</span>
                <span>{routine.level}</span>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
