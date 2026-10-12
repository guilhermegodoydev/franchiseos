"use server";

import { cookies } from "next/headers";
import { LoginFormData, loginSchema } from "./schema";

interface LoginResult {
  success: boolean;
  error?: string;
}

export async function loginUser(data: LoginFormData): Promise<LoginResult> {
  const parsed = loginSchema.safeParse(data);
  if (!parsed.success) {
    return { success: false, error: "Dados inválidos. Verifique os campos e tente novamente." };
  }

  try {
    const res = await fetch("http://localhost:5189/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(parsed.data),
    });

    if (!res.ok) {
      const problem = await res.json().catch(() => null);
      return { success: false, error: problem?.detail ?? "E-mail ou senha inválidos." };
    }

    const result = await res.json();

    (await cookies()).set("session_token", result.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 8,
      path: "/",
    });

    return { success: true };
  } catch {
    return { success: false, error: "Erro de conexão com o servidor." };
  }
}

export async function logoutUser(): Promise<void> {
  (await cookies()).delete("session_token");
}