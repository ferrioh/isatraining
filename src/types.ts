export type ClientStatus = "paid" | "pending" | "overdue";

export type RealtimeMode = "connecting" | "ws" | "local";

export interface Routine {
  id: string;
  name: string;
  focus: string;
  duration: string;
  kcal: number;
  level: string;
  icon: string;
}

export interface Client {
  id: number;
  name: string;
  plan: string;
  status: ClientStatus;
  routines: string[];
}

export type ClientAction =
  | { type: "add-routine"; clientId: number; routineId: string }
  | { type: "remove-routine"; clientId: number; routineId: string };

export interface RealtimeMessage {
  type: "init" | "state" | "presence" | "pong";
  clients?: Client[];
  online?: number;
}
