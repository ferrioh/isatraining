import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { ROUTINES, SEED_CLIENTS } from "../data";
import { getWsUrl } from "../lib/realtime";
import type { Client, ClientAction, RealtimeMessage, RealtimeMode } from "../types";

interface ClientsContextValue {
  clients: Client[];
  routines: typeof ROUTINES;
  online: number;
  mode: RealtimeMode;
  totalRoutines: number;
  addRoutine: (clientId: number, routineId: string) => void;
  removeRoutine: (clientId: number, routineId: string) => void;
  getClient: (id: number) => Client | undefined;
}

const ClientsContext = createContext<ClientsContextValue | null>(null);

const STORAGE_KEY = "isa-training-clients-v2";
const CHANNEL_NAME = "isa-training-clients";

function loadLocalClients(): Client[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as Client[];
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch {
    // localStorage no disponible: usamos la semilla
  }
  return SEED_CLIENTS;
}

function applyAction(clients: Client[], action: ClientAction): Client[] {
  return clients.map((client) => {
    if (client.id !== action.clientId) return client;

    if (action.type === "add-routine") {
      if (client.routines.includes(action.routineId)) return client;
      return { ...client, routines: [...client.routines, action.routineId] };
    }

    return {
      ...client,
      routines: client.routines.filter((id) => id !== action.routineId),
    };
  });
}

export function ClientsProvider({ children }: { children: ReactNode }) {
  const [clients, setClients] = useState<Client[]>(loadLocalClients);
  const [online, setOnline] = useState(1);
  const [mode, setMode] = useState<RealtimeMode>("connecting");

  const clientsRef = useRef<Client[]>(clients);
  const socketRef = useRef<WebSocket | null>(null);
  const channelRef = useRef<BroadcastChannel | null>(null);
  const modeRef = useRef<RealtimeMode>("connecting");

  const commit = useCallback((next: Client[]) => {
    clientsRef.current = next;
    setClients(next);
  }, []);

  const setModeSafe = useCallback((next: RealtimeMode) => {
    modeRef.current = next;
    setMode(next);
  }, []);

  useEffect(() => {
    let active = true;
    let startedLocal = false;
    let attempt = 0;
    let retryTimer: number | undefined;

    const startLocal = () => {
      if (!active || startedLocal) return;
      startedLocal = true;
      setModeSafe("local");
      setOnline(1);

      if ("BroadcastChannel" in window) {
        const channel = new BroadcastChannel(CHANNEL_NAME);
        channel.onmessage = (event: MessageEvent) => {
          const data = event.data as { type?: string; clients?: Client[] } | null;
          if (data?.type === "state" && Array.isArray(data.clients)) {
            clientsRef.current = data.clients;
            setClients(data.clients);
          }
        };
        channelRef.current = channel;
      }
    };

    const handleMessage = (event: MessageEvent) => {
      try {
        const data = JSON.parse(String(event.data)) as RealtimeMessage;
        if (Array.isArray(data.clients)) {
          clientsRef.current = data.clients;
          setClients(data.clients);
        }
        if (typeof data.online === "number") {
          setOnline(data.online);
        }
        if (data.type === "init" || data.type === "state") {
          setModeSafe("ws");
        }
      } catch {
        // mensaje no reconocido
      }
    };

    const wsUrl = getWsUrl();

    if (!wsUrl) {
      startLocal();
    } else {
      const connect = () => {
        if (!active) return;
        const socket = new WebSocket(wsUrl);
        socketRef.current = socket;

        socket.onopen = () => {
          if (!active) return;
          attempt = 0;
          setModeSafe("ws");
        };

        socket.onmessage = handleMessage;

        socket.onerror = () => {
          // onclose se encarga del reintento / fallback
        };

        socket.onclose = () => {
          if (!active) return;
          if (modeRef.current === "ws") {
            setModeSafe("connecting");
          }
          if (attempt < 4) {
            attempt += 1;
            retryTimer = window.setTimeout(connect, 800);
          } else {
            startLocal();
          }
        };
      };

      connect();
    }

    return () => {
      active = false;
      if (retryTimer) window.clearTimeout(retryTimer);
      socketRef.current?.close();
      socketRef.current = null;
      channelRef.current?.close();
      channelRef.current = null;
    };
  }, [setModeSafe]);

  const dispatch = useCallback(
    (action: ClientAction) => {
      const socket = socketRef.current;
      const isLive = modeRef.current === "ws" && socket?.readyState === WebSocket.OPEN;

      if (isLive && socket) {
        socket.send(JSON.stringify(action));
      }

      const next = applyAction(clientsRef.current, action);
      commit(next);

      if (!isLive) {
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
        } catch {
          // sin persistencia
        }
        channelRef.current?.postMessage({ type: "state", clients: next });
      }
    },
    [commit],
  );

  const addRoutine = useCallback(
    (clientId: number, routineId: string) => {
      dispatch({ type: "add-routine", clientId, routineId });
    },
    [dispatch],
  );

  const removeRoutine = useCallback(
    (clientId: number, routineId: string) => {
      dispatch({ type: "remove-routine", clientId, routineId });
    },
    [dispatch],
  );

  const getClient = useCallback(
    (id: number) => clients.find((client) => client.id === id),
    [clients],
  );

  const totalRoutines = useMemo(
    () => clients.reduce((total, client) => total + client.routines.length, 0),
    [clients],
  );

  const value = useMemo<ClientsContextValue>(
    () => ({
      clients,
      routines: ROUTINES,
      online,
      mode,
      totalRoutines,
      addRoutine,
      removeRoutine,
      getClient,
    }),
    [clients, online, mode, totalRoutines, addRoutine, removeRoutine, getClient],
  );

  return <ClientsContext.Provider value={value}>{children}</ClientsContext.Provider>;
}

export function useClients(): ClientsContextValue {
  const context = useContext(ClientsContext);
  if (!context) {
    throw new Error("useClients debe usarse dentro de ClientsProvider");
  }
  return context;
}
