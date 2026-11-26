import type { RoyaltyStatus } from "./schema";

export const MONTH_NAMES = [
  "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro",
];

export function formatCurrency(value: number) {
  return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value);
}

export function formatReference(month: number, year: number) {
  return `${String(month).padStart(2, "0")}/${year}`;
}

export function formatDueDate(iso: string) {
  return new Date(iso).toLocaleDateString("pt-BR", { timeZone: "UTC" });
}

export function formatPayDate(iso: string | null) {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("pt-BR", { timeZone: "America/Sao_Paulo" });
}


export function todayInSaoPaulo() {
  return new Date().toLocaleDateString("en-CA", { timeZone: "America/Sao_Paulo" });
}

export function previousMonth() {
  const [year, month] = todayInSaoPaulo().split("-").map(Number);
  return month === 1 ? { month: 12, year: year - 1 } : { month: month - 1, year };
}

export function buildRoyaltiesHref(page: number, status?: RoyaltyStatus) {
  const params = new URLSearchParams();
  if (status) params.set("status", status);
  if (page > 1) params.set("page", String(page));
  const qs = params.toString();
  return qs ? `/royalties?${qs}` : "/royalties";
}