import { Outlet } from "react-router-dom";
import BottomNav from "./BottomNav";
import Header from "./Header";

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-surface text-on-surface font-body">
      <Header />
      <main className="flex-1 pt-16 pb-28 px-5">
        <Outlet />
      </main>
      <BottomNav />
    </div>
  );
}
