import { useNavigate } from "react-router-dom";
import { useClients } from "../context/ClientsContext";
import { initials } from "../data";

const SETTINGS = [
  {
    icon: "lock_reset",
    title: "Credenciales & Seguridad",
    detail: "Actualizar contraseña de acceso",
  },
  {
    icon: "notifications_active",
    title: "Recordatorios de rutina",
    detail: "Alertas diarias a las 07:00 AM",
  },
  {
    icon: "watch",
    title: "Dispositivos & Biometría",
    detail: "Apple Watch sincronizado",
  },
];

export default function Profile() {
  const navigate = useNavigate();
  const { clients } = useClients();
  const me = clients[0];
  const routineCount = me?.routines.length ?? 0;

  const handleLogout = () => {
    if (window.confirm("¿Deseas cerrar tu sesión actual en ISA TRAINING?")) {
      window.alert("Sesión finalizada (demo).");
    }
  };

  return (
    <div className="flex flex-col gap-5">
      <section className="relative overflow-hidden rounded-3xl bg-white/90 backdrop-blur-xl p-5 shadow-[0_12px_36px_rgba(224,53,122,0.06)] flex flex-col items-center text-center">
        <div className="absolute inset-0 bg-gradient-to-b from-secondary-container/40 via-transparent to-transparent pointer-events-none" />
        <div className="relative flex flex-col items-center gap-2">
          <div className="w-20 h-20 rounded-full bg-primary text-on-primary flex items-center justify-center font-label text-2xl font-bold shadow-[0_10px_28px_rgba(181,5,91,0.3)]">
            {me ? initials(me.name) : "BG"}
          </div>
          <div>
            <h2 className="font-display text-xl font-semibold text-on-surface">
              {me?.name ?? "Bella García"}
            </h2>
            <p className="font-body text-xs text-on-surface-variant">
              {me?.plan ?? "Atelier VIP"} · Miembro desde 2024
            </p>
          </div>
          <span className="rounded-full bg-success-container px-3 py-1 font-label text-[10px] font-semibold uppercase tracking-wider text-success">
            Membresía activa
          </span>
        </div>
      </section>

      <section className="grid grid-cols-3 gap-2">
        <div className="rounded-2xl bg-white/90 backdrop-blur-xl p-3 shadow-[0_6px_20px_rgba(0,0,0,0.04)] text-center">
          <span className="block font-label text-2xl font-bold text-primary">{routineCount}</span>
          <span className="block font-label text-[9px] font-semibold uppercase tracking-wider text-on-surface-variant">
            Rutinas
          </span>
        </div>
        <div className="rounded-2xl bg-white/90 backdrop-blur-xl p-3 shadow-[0_6px_20px_rgba(0,0,0,0.04)] text-center">
          <span className="block font-label text-2xl font-bold text-tertiary">12</span>
          <span className="block font-label text-[9px] font-semibold uppercase tracking-wider text-on-surface-variant">
            Semanas
          </span>
        </div>
        <div className="rounded-2xl bg-white/90 backdrop-blur-xl p-3 shadow-[0_6px_20px_rgba(0,0,0,0.04)] text-center">
          <span className="block font-label text-2xl font-bold text-success">86%</span>
          <span className="block font-label text-[9px] font-semibold uppercase tracking-wider text-on-surface-variant">
            Asistencia
          </span>
        </div>
      </section>

      <section className="rounded-3xl bg-white/90 backdrop-blur-xl p-5 shadow-[0_8px_24px_rgba(0,0,0,0.04)] flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h3 className="font-display text-base font-semibold text-on-surface">Mi membresía</h3>
          <span className="rounded-full bg-primary-fixed px-2.5 py-1 font-label text-[10px] font-semibold uppercase tracking-wider text-on-primary-fixed">
            Activo
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="font-label text-[10px] font-semibold uppercase tracking-wider text-on-surface-variant">
            Próxima cuota
          </span>
          <span className="font-body text-xs font-semibold text-on-surface">05 de Noviembre, 2026</span>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => navigate("/gestion")}
            className="flex-1 py-2.5 rounded-full bg-surface-container text-on-surface font-label text-[10px] font-semibold uppercase tracking-wider active:scale-95 transition-transform"
          >
            Ver recibos
          </button>
          <button
            type="button"
            onClick={() => navigate("/gestion")}
            className="flex-1 py-2.5 rounded-full bg-primary text-on-primary font-label text-[10px] font-semibold uppercase tracking-wider shadow-[0_4px_16px_rgba(181,5,91,0.25)] active:scale-95 transition-transform"
          >
            Gestionar pago
          </button>
        </div>
      </section>

      <button
        type="button"
        onClick={() => navigate("/gestion")}
        className="w-full flex items-center justify-between rounded-3xl bg-primary text-on-primary p-4 shadow-[0_8px_24px_rgba(181,5,91,0.25)] active:scale-[0.99] transition-transform"
      >
        <span className="flex items-center gap-2 font-label text-[11px] font-semibold uppercase tracking-wider">
          <span className="material-symbols-outlined text-[20px]">sync_alt</span>
          Modo Isa Trainer
        </span>
        <span className="material-symbols-outlined text-[20px]">chevron_right</span>
      </button>

      <section className="rounded-3xl bg-white/90 backdrop-blur-xl p-2 shadow-[0_8px_24px_rgba(0,0,0,0.04)] flex flex-col">
        {SETTINGS.map((item, index) => (
          <button
            key={item.title}
            type="button"
            className={`flex items-center gap-3 p-3 text-left ${
              index < SETTINGS.length - 1 ? "border-b border-outline-variant/40" : ""
            }`}
          >
            <span className="w-9 h-9 rounded-full bg-surface-container text-primary flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
            </span>
            <span className="flex-1 min-w-0">
              <span className="block font-body text-sm font-semibold text-on-surface">
                {item.title}
              </span>
              <span className="block font-body text-xs text-on-surface-variant">{item.detail}</span>
            </span>
            <span className="material-symbols-outlined text-[20px] text-on-surface-variant">
              chevron_right
            </span>
          </button>
        ))}
      </section>

      <button
        type="button"
        onClick={handleLogout}
        className="w-full flex items-center justify-center gap-2 rounded-full bg-error-container py-3 font-label text-[10px] font-semibold uppercase tracking-wider text-on-error-container active:scale-95 transition-transform"
      >
        <span className="material-symbols-outlined text-[18px]">logout</span>
        Cerrar sesión
      </button>
    </div>
  );
}
