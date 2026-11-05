import type { Client, ClientStatus, Routine } from "./types";

export const ROUTINES: Routine[] = [
  {
    id: "r1",
    name: "Lower Body Sculpt",
    focus: "Glúteos & Isquios",
    duration: "45 min",
    level: "Pro",
    icon: "fitness_center",
  },
  {
    id: "r2",
    name: "Upper Body & Core Power",
    focus: "Torso & Postura",
    duration: "35 min",
    level: "Intermedio",
    icon: "bolt",
  },
  {
    id: "r3",
    name: "Mobility Reset",
    focus: "Movilidad",
    duration: "20 min",
    level: "Todos",
    icon: "spa",
  },
  {
    id: "r4",
    name: "HIIT Quema Total",
    focus: "Cardio",
    duration: "30 min",
    level: "Avanzado",
    icon: "local_fire_department",
  },
  {
    id: "r5",
    name: "Core de Acero",
    focus: "Abdomen",
    duration: "25 min",
    level: "Intermedio",
    icon: "exercise",
  },
];

export const SEED_CLIENTS: Client[] = [
  { id: 1, name: "Bella García", plan: "Online Personalizado", status: "paid", routines: ["r1", "r3"] },
  { id: 2, name: "Camila Rojas", plan: "Online VIP", status: "pending", routines: ["r2"] },
  {
    id: 3,
    name: "Valentina Pérez",
    plan: "Online Personalizado",
    status: "paid",
    routines: ["r1", "r4", "r5"],
  },
  { id: 4, name: "Martina López", plan: "Online VIP", status: "overdue", routines: ["r3"] },
  { id: 5, name: "Sofía Herrera", plan: "Online Personalizado", status: "paid", routines: ["r2", "r5"] },
  { id: 6, name: "Isidora Fuentes", plan: "Online VIP", status: "pending", routines: ["r4"] },
];

export const STATUS_META: Record<ClientStatus, { label: string; className: string }> = {
  paid: { label: "Al día", className: "bg-success-container text-success" },
  pending: { label: "Pendiente", className: "bg-primary-fixed text-on-primary-fixed" },
  overdue: { label: "Vencido", className: "bg-error-container text-on-error-container" },
};

export interface WeekExercise {
  name: string;
  detail: string;
  icon: string;
}

export interface WeekDay {
  id: string;
  day: string;
  date: string;
  title: string;
  focus: string;
  exercises: WeekExercise[];
}

export const WEEK: WeekDay[] = [
  {
    id: "mon",
    day: "Lun",
    date: "14",
    title: "Lower Body Sculpt",
    focus: "Glúteos & Isquios",
    exercises: [
      { name: "Hip Thrust con barra", detail: "4 series · 12 reps", icon: "fitness_center" },
      { name: "Sentadilla búlgara", detail: "3 series · 10 reps", icon: "accessibility_new" },
      { name: "Peso muerto rumano", detail: "3 series · 12 reps", icon: "sports_gymnastics" },
    ],
  },
  {
    id: "tue",
    day: "Mar",
    date: "15",
    title: "Upper Body & Core Power",
    focus: "Torso & Postura",
    exercises: [
      { name: "Press militar con mancuernas", detail: "4 series · 10 reps", icon: "fitness_center" },
      { name: "Remo unilateral", detail: "3 series · 12 reps", icon: "sports_martial_arts" },
      { name: "Plancha hollow", detail: "3 series · 40 seg", icon: "self_improvement" },
    ],
  },
  {
    id: "wed",
    day: "Mié",
    date: "16",
    title: "Mobility Reset",
    focus: "Movilidad & Recuperación",
    exercises: [
      { name: "Movilidad de cadera 90/90", detail: "3 rondas · 8 reps", icon: "spa" },
      { name: "Cat-cow controlado", detail: "2 rondas · 10 reps", icon: "self_improvement" },
      { name: "Estiramiento de psoas", detail: "2 series · 45 seg", icon: "accessibility_new" },
    ],
  },
  {
    id: "thu",
    day: "Jue",
    date: "17",
    title: "HIIT Quema Total",
    focus: "Cardio de alta intensidad",
    exercises: [
      { name: "Burpees con salto", detail: "5 rondas · 30 seg", icon: "local_fire_department" },
      { name: "Mountain climbers", detail: "5 rondas · 40 seg", icon: "bolt" },
      { name: "Skipping alto", detail: "5 rondas · 45 seg", icon: "sprint" },
    ],
  },
  {
    id: "fri",
    day: "Vie",
    date: "18",
    title: "Core de Acero",
    focus: "Abdomen & Estabilidad",
    exercises: [
      { name: "Dead bug", detail: "4 series · 12 reps", icon: "self_improvement" },
      { name: "Elevación de piernas", detail: "3 series · 15 reps", icon: "exercise" },
      { name: "Pallof press", detail: "3 series · 12 reps", icon: "sports_gymnastics" },
    ],
  },
  {
    id: "sat",
    day: "Sáb",
    date: "19",
    title: "Full Body Flow",
    focus: "Fuerza global",
    exercises: [
      { name: "Sentadilla goblet", detail: "4 series · 12 reps", icon: "fitness_center" },
      { name: "Flexiones controladas", detail: "3 series · 10 reps", icon: "sports_martial_arts" },
      { name: "Farmer carry", detail: "3 series · 40 seg", icon: "exercise" },
    ],
  },
];

export function routineById(id: string): Routine | undefined {
  return ROUTINES.find((routine) => routine.id === id);
}

export function initials(name: string): string {
  return name
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

