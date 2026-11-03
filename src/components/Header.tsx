import { useLocation, useNavigate } from "react-router-dom";

const TITLES: Record<string, string> = {
  "/": "Descubre",
  "/rutinas": "Rutinas Semanales",
  "/clientes": "Clientes",
  "/gestion": "Clientes y Pagos",
  "/perfil": "Mi Perfil",
};

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const title = TITLES[location.pathname] ?? "ISA TRAINING";

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-surface/80 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
      <div className="h-16 px-5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-primary text-on-primary flex items-center justify-center font-label text-xs font-bold tracking-wide">
            IS
          </div>
          <div className="flex flex-col">
            <span className="font-label text-[10px] font-semibold uppercase tracking-[0.2em] text-primary">
              ISA TRAINING
            </span>
            <h1 className="font-display text-lg font-semibold leading-tight text-on-surface">{title}</h1>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button
            type="button"
            aria-label="Notificaciones"
            className="w-11 h-11 rounded-full flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors"
          >
            <span className="material-symbols-outlined text-[22px]">notifications</span>
          </button>
          <button
            type="button"
            aria-label="Ir al perfil"
            onClick={() => navigate("/perfil")}
            className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shadow-[0_4px_12px_rgba(181,5,91,0.25)]"
          >
            <span className="material-symbols-outlined text-[18px] text-on-primary">person</span>
          </button>
        </div>
      </div>
    </header>
  );
}
