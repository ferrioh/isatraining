import type { RouteObject } from "react-router-dom";
import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import { ClientsProvider } from "./context/ClientsContext";
import Clients from "./pages/Clients";
import Discover from "./pages/Discover";
import Management from "./pages/Management";
import Profile from "./pages/Profile";
import Routines from "./pages/Routines";

const routes: RouteObject[] = [
  { index: true, element: <Discover /> },
  { path: "rutinas", element: <Routines /> },
  { path: "clientes", element: <Clients /> },
  { path: "gestion", element: <Management /> },
  { path: "perfil", element: <Profile /> },
];

export default function App() {
  return (
    <ClientsProvider>
      <Routes>
        <Route element={<Layout />}>
          {routes.map((route) =>
            route.index ? (
              <Route key="index" index element={route.element} />
            ) : (
              <Route key={route.path} path={route.path} element={route.element} />
            ),
          )}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </ClientsProvider>
  );
}
