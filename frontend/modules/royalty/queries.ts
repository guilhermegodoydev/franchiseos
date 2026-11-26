import { authFetch } from "@/shared/api";
import type { PagedRoyalties, Royalty, RoyaltyStatus } from "./schema";

const STATUS_BY_NUMBER: Record<number, RoyaltyStatus> = {
  1: "Pending",
  2: "Overdue",
  3: "Paid",
  4: "Cancelled",
};

function normalizeStatus(value: unknown): RoyaltyStatus {
  if (typeof value === "number") return STATUS_BY_NUMBER[value] ?? "Pending";
  return (value as RoyaltyStatus) ?? "Pending";
}

type GetRoyaltiesParams = {
  page: number;
  pageSize?: number;
  status?: RoyaltyStatus;
};

export async function getRoyalties({
  page,
  pageSize = 10,
  status,
}: GetRoyaltiesParams): Promise<PagedRoyalties> {
  const params = new URLSearchParams({ page: String(page), pageSize: String(pageSize) });
  if (status) params.set("status", status);

  const res = await authFetch(`/api/royalties?${params}`);
  if (!res.ok) throw new Error(res.text.toString());

  const data = await res.json();

  return {
    royalties: (data.royalties as Royalty[]).map((r) => ({
      ...r,
      status: normalizeStatus(r.status),
    })),
    totalItems: data.totalItems,
    totalPages: data.totalPages,
  };
}