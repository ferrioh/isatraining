import { NavLink } from "react-router-dom";

const ITEMS = [
  { to: "/", label: "Descubre", icon: "explore", end: true },
  { to: "/rutinas", label: "Rutinas", icon: "calendar_today" },
  { to: "/clientes", label: "Clientes", icon: "groups" },
  { to: "/gestion", label: "Gestión", icon: "payments" },
  { to: "/perfil", label: "Perfil", icon: "account_circle" },
];

export default function BottomNav() {
  return (
    <nav
      aria-label="Navegación principal"
      className="fixed inset-x-0 bottom-0 z-50 pointer-events-none pb-[env(safe-area-inset-bottom)]"
    >
      <div className="px-5 pb-2 pt-1">
        <div className="pointer-events-auto h-16 rounded-2xl bg-white/85 backdrop-blur-2xl shadow-[0_12px_32px_rgba(181,5,91,0.08)] flex items-center justify-around px-1">
          {ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `flex flex-col items-center justify-center min-w-[56px] min-h-[44px] gap-0.5 transition-all duration-200 ${
                  isActive
                    ? "text-primary font-semibold"
                    : "text-on-surface-variant hover:text-primary"
                }`
              }
            >
              <span className="material-symbols-outlined text-[22px]">{item.icon}</span>
              <span className="font-label text-[10px] uppercase tracking-wider">{item.label}</span>
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
}
