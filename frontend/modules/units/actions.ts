"use server";

import { updateTag } from "next/cache";
import { unitSchema } from "./schema";

const createUnitSchema = unitSchema.omit({ id: true });

interface CreateUnitResult {
  success: boolean;
  error?: string;
}

export async function createUnit(mainOfficeId: string, data: unknown): Promise<CreateUnitResult> {
  const parsed = createUnitSchema.safeParse({ ...(data as object), main_office_id: mainOfficeId });

  if (!parsed.success) {
    return { success: false, error: "Dados inválidos. Verifique os campos e tente novamente." };
  }

  try {
    const res = await fetch(`http://localhost:5189/api/units/office/${mainOfficeId.toString()}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(parsed.data),
    });

    if (!res.ok) {
      const problem = await res.json().catch(() => null);
      return { success: false, error: problem?.detail ?? "Não foi possível criar a unidade." };
    }

    updateTag("units-office");

    return { success: true };
  } catch {
    return { success: false, error: "Erro de conexão com o servidor." };
  }
}