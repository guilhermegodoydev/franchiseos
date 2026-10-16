import { cookies } from "next/headers";

const API_URL = "http://localhost:5189";

export async function authFetch(path: string, options: RequestInit = {}) {
  const token = (await cookies()).get("session_token")?.value;

  return fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      ...(options.headers ?? {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });
}