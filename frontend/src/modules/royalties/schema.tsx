import z from "zod";

export const royaltySchema = z.object({
    id: z.uuidv7(),
    monthly_revenue_id: z.uuidv7(),
    calculated_amount: z.number().min(0, "O valor total não pode ser nulo").nonnegative("O valor total não pode ser negativo"),
    royalties_percentage: z.number().min(1, "A porcentagem não pode ser menor que 1").nonnegative("A porcentagem não pode ser negativa"),
    payment_status: z.enum(["PENDENTE", "PAGO", "ATRASADO"]).default("PENDENTE"),
    due_date: z.coerce.date("Campo data é obrigatório"),
    created_at: z.coerce.date().default(() => new Date())
});

export type Royalty = z.infer<typeof royaltySchema>;