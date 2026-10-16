import "server-only";
import { cookies } from "next/headers";

const API_URL = process.env.API_URL;

if (!API_URL) {
  throw new Error("API_URL não está definida no .env");
}

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