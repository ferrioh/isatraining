import { WebSocketServer } from "ws";

const ROUTINES = [
  { id: "r1", name: "Lower Body Sculpt" },
  { id: "r2", name: "Upper Body & Core Power" },
  { id: "r3", name: "Mobility Reset" },
  { id: "r4", name: "HIIT Quema Total" },
  { id: "r5", name: "Core de Acero" },
];

const clients = [
  { id: 1, name: "Bella García", plan: "Atelier VIP", status: "paid", routines: ["r1", "r3"] },
  { id: 2, name: "Camila Rojas", plan: "Online VIP", status: "pending", routines: ["r2"] },
  {
    id: 3,
    name: "Valentina Pérez",
    plan: "Atelier Presencial",
    status: "paid",
    routines: ["r1", "r4", "r5"],
  },
  { id: 4, name: "Martina López", plan: "Online VIP", status: "overdue", routines: ["r3"] },
  { id: 5, name: "Sofía Herrera", plan: "Atelier VIP", status: "paid", routines: ["r2", "r5"] },
  { id: 6, name: "Isidora Fuentes", plan: "Online VIP", status: "pending", routines: ["r4"] },
];

let online = 0;

function snapshot() {
  return { type: "state", clients, online };
}

function broadcast(wss, payload, except) {
  const data = JSON.stringify(payload);
  for (const socket of wss.clients) {
    if (socket.readyState === 1 && socket !== except) {
      socket.send(data);
    }
  }
}

function applyAction(action) {
  const client = clients.find((item) => item.id === action.clientId);
  if (!client) return false;

  if (action.type === "add-routine") {
    if (!ROUTINES.some((routine) => routine.id === action.routineId)) return false;
    if (client.routines.includes(action.routineId)) return false;
    client.routines = [...client.routines, action.routineId];
    return true;
  }

  if (action.type === "remove-routine") {
    const before = client.routines.length;
    client.routines = client.routines.filter((id) => id !== action.routineId);
    return client.routines.length !== before;
  }

  return false;
}

export function attachRealtime(server, options = {}) {
  const wss = new WebSocketServer({ server, path: options.path ?? "/ws" });

  wss.on("connection", (socket) => {
    online += 1;
    socket.send(JSON.stringify({ type: "init", clients, online }));
    broadcast(wss, { type: "presence", online });
    console.log(`[realtime] cliente conectado (${online} en línea)`);

    socket.on("message", (raw) => {
      let message;
      try {
        message = JSON.parse(raw.toString());
      } catch {
        return;
      }

      if (message?.type === "ping") {
        socket.send(JSON.stringify({ type: "pong" }));
        return;
      }

      if (message?.type === "add-routine" || message?.type === "remove-routine") {
        if (applyAction(message)) {
          broadcast(wss, snapshot());
        }
      }
    });

    socket.on("close", () => {
      online = Math.max(0, online - 1);
      broadcast(wss, { type: "presence", online });
      console.log(`[realtime] cliente desconectado (${online} en línea)`);
    });
  });

  return wss;
}
