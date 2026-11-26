"use server";

import { revalidatePath } from "next/cache";
import { authFetch } from "@/shared/api";
import {
  cancelRoyaltySchema,
  generateRoyaltiesSchema,
  PayMethod,
  payRoyaltySchema,
  type ActionResult,
} from "./schema";
import { todayInSaoPaulo } from "./utils";

async function readError(res: Response, fallback: string) {
  try {
    const body = await res.json();
    if (body && typeof body === "object") {
      return body.detail ?? body.message ?? body.title ?? fallback;
    }
  } catch {}
  return fallback;
}

export async function generateRoyaltiesAction(
  input: { month: number; year: number }
): Promise<ActionResult<{ created: number }>> {
  const parsed = generateRoyaltiesSchema.safeParse(input);
  if (!parsed.success) return { ok: false, error: "Informe um mês e um ano válidos." };

  const res = await authFetch("/api/royalties/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(parsed.data),
  });

  if (!res.ok) return { ok: false, error: await readError(res, "Não foi possível gerar os royalties.") };

  const { created } = await res.json();
  revalidatePath("/royalties");
  return { ok: true, data: { created } };
}

export async function payRoyaltyAction(
  input: { id: string; payMethod: PayMethod; payDate: string }
): Promise<ActionResult> {
  const parsed = payRoyaltySchema.safeParse(input);
  if (!parsed.success) return { ok: false, error: "Dados de pagamento inválidos." };

  const { id, payMethod, payDate } = parsed.data;

  if (payDate > todayInSaoPaulo()) {
    return { ok: false, error: "A data de pagamento não pode ser futura." };
  }

  const res = await authFetch(`/api/royalties/${id}/pay`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      payMethod,
      payDate: new Date(`${payDate}T12:00:00-03:00`).toISOString(),
    }),
  });

  if (!res.ok) return { ok: false, error: await readError(res, "Não foi possível registrar o pagamento.") };

  revalidatePath("/royalties");
  return { ok: true, data: undefined };
}

export async function cancelRoyaltyAction(
  input: { id: string; reason: string }
): Promise<ActionResult> {
  const parsed = cancelRoyaltySchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Dados inválidos." };
  }

  const { id, reason } = parsed.data;

  const res = await authFetch(`/api/royalties/${id}/cancel`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ reason }),
  });

  if (!res.ok) return { ok: false, error: await readError(res, "Não foi possível cancelar o royalty.") };

  revalidatePath("/royalties");
  return { ok: true, data: undefined };
}