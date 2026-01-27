// src/lib/guards.ts
import { getToken } from "./auth";

export function isAuthed(): boolean {
  return !!getToken();
}
