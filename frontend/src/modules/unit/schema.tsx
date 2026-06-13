import z from "zod";

export const unitSchema = z.object({
    id: z.uuidv7(),
    name: z.string().min(3, "Nome deve ter pelo menos 3 caracteres").max(200, "Nome muito grande"),
    city: z.string().min(2).max(200, "O nome da cidade é muito grande"),
    state: z.string().min(2, "A sigla deve ter 2 letras").max(2, "A sigla deve ter 2 letras"),
    royalties_percentage: z.number().min(0, "A taxa mínima é de 0%").max(100, "A taxa máxima é de 100%").nonnegative().nullable(),
    stats: z.enum(["ATIVA", "SUSPENSA"]).default("ATIVA"),
    type: z.enum(["UNIDADE", "FRANQUEADO"]).default("UNIDADE"),
    unit_size: z.enum(["PEQUENA","MÉDIA","GRANDE"]).default("PEQUENA"),
    main_office_id: z.uuidv7(),
    manager_name: z.string().min(3, "Nome deve ter pelo menos 3 caracteres").max(200, "Nome muito grande"),
});

export type Unit = z.infer<typeof unitSchema>;