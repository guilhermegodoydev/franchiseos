"use server";

import { updateTag } from "next/cache";
import { authFetch } from "@/shared/api";
import { CreateUnitFormData, createUnitSchema, UpdateUnitFormData, updateUnitSchema } from "./schema";

interface Res { success: boolean; error?: string; }

export async function createUnit(data: CreateUnitFormData): Promise<Res> {
  const parsed = createUnitSchema.safeParse(data);
  if (!parsed.success) return { success: false, error: "Dados inválidos. Verifique os campos e tente novamente." };

  try {
    const res = await authFetch(`/api/units`, {
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

export async function getUnitById(unitId: string): Promise<{ success: boolean; data?: UpdateUnitFormData; error?: string }> {
  try {
    const res = await authFetch(`/api/units/${unitId}`);
    if (!res.ok) {
      const problem = await res.json().catch(() => null);
      return { success: false, error: problem?.detail ?? "Não foi possível carregar a unidade." };
    }
    return { success: true, data: await res.json() };
  } catch {
    return { success: false, error: "Erro de conexão com o servidor." };
  }
}

export async function updateUnit(unitId: string, data: UpdateUnitFormData): Promise<Res> {
  const parsed = updateUnitSchema.safeParse(data);
  if (!parsed.success) return { success: false, error: "Dados inválidos. Verifique os campos e tente novamente." };

  try {
    const res = await authFetch(`/api/units/${unitId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(parsed.data),
    });

    if (!res.ok) {
      const problem = await res.json().catch(() => null);
      return { success: false, error: problem?.detail ?? "Não foi possível atualizar a unidade." };
    }

    updateTag("units-office");
    return { success: true };
  } catch {
    return { success: false, error: "Erro de conexão com o servidor." };
  }
}

export async function deactivateUnit(unitId: string): Promise<Res> {
  try {
    const res = await authFetch(`/api/units/${unitId}/deactivate`, { method: "PATCH" });
    if (!res.ok) {
      const problem = await res.json().catch(() => null);
      return { success: false, error: problem?.detail ?? "Não foi possível desativar a unidade." };
    }
    updateTag("units-office");
    updateTag("units-metrics");
    return { success: true };
  } catch {
    return { success: false, error: "Erro de conexão com o servidor." };
  }
}