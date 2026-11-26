import { z } from "zod";

export const ROYALTY_STATUSES = ["Pending", "Overdue", "Paid", "Cancelled"] as const;
export type RoyaltyStatus = (typeof ROYALTY_STATUSES)[number];

export const ROYALTY_STATUS_LABEL: Record<RoyaltyStatus, string> = {
  Pending: "Pendente",
  Overdue: "Atrasado",
  Paid: "Pago",
  Cancelled: "Cancelado",
};

export const cancelRoyaltyFormSchema = z.object({
  reason: z.string().trim().min(5, "Informe o motivo (mínimo 5 caracteres)").max(500, "Motivo muito grande"),
});
export type CancelRoyaltyFormData = z.infer<typeof cancelRoyaltyFormSchema>;

export const PAY_METHOD = ["Pix", "BankTransfer", "BankSlip", "Other"] as const;
export type PayMethod = (typeof PAY_METHOD)[number];

export const PAY_METHOD_LABEL: Record<PayMethod, string> = {
  Pix: "Pix",
  BankTransfer: "Transferência",
  BankSlip: "Boleto",
  Other: "Outro",
};

export const royaltySchema = z.object({
  id: z.uuidv7("ID inválido"),
  unitName: z.string().min(3, "Nome da unidade inválido").max(150, "Nome da unidade muito grande"),
  status: z.enum(ROYALTY_STATUSES, "Selecione um status válido"),
  percentage: z.number().min(1, "O percentual mínimo é de 1%").max(100, "O percentual máximo é de 100%"),
  amount: z.number().nonnegative("O valor não pode ser negativo").max(9_999_999_999.99, "O valor excede o limite permitido"),
  referenceMonth: z.number().int().min(1, "Mês de referência inválido").max(12, "Mês de referência inválido"),
  referenceYear: z.number().int().min(2000, "Ano de referência inválido").max(2100, "Ano de referência inválido"),
  payDate: z.iso.datetime({ offset: true }).nullable(),
  dueDate: z.iso.datetime({ offset: true }),
});

export type Royalty = z.infer<typeof royaltySchema>;

export type PagedRoyalties = {
  royalties: Royalty[];
  totalItems: number;
  totalPages: number;
};

export type ActionResult<T = undefined> =
  | { ok: true; data: T }
  | { ok: false; error: string };

export const generateRoyaltiesSchema = z.object({
  month: z.number().int().min(1).max(12),
  year: z.number().int().min(2000).max(2100),
});

export const payRoyaltyFormSchema = z.object({
  payMethod: z.enum(PAY_METHOD, "Selecione a forma de pagamento"),
  payDate: z.iso.date("Data de pagamento inválida"),
});
export type PayRoyaltyFormData = z.infer<typeof payRoyaltyFormSchema>;

export const payRoyaltySchema = royaltySchema.pick({ id: true }).extend(payRoyaltyFormSchema.shape);

export const cancelRoyaltySchema = royaltySchema.pick({ id: true }).extend(cancelRoyaltyFormSchema.shape);