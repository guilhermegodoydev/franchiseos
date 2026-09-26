import z, { string } from "zod";

export const UNIT_STATUS = ["Active", "Inactive"] as const;
export type UnitStatus = typeof UNIT_STATUS[number];

export const UNIT_STATUS_LABEL: Record<UnitStatus, string> = {
    Active: "Ativa",
    Inactive: "Inativa"
};

export const UNIT_SIZE = ["Kiosk", "StandardStore", "StreetStore", "Flagship"] as const;
export type UnitSize = typeof UNIT_SIZE[number];

export const UNIT_SIZE_LABEL: Record<UnitSize, string> = {
    Kiosk: "Quiosque",
    StandardStore: "Loja de Shopping",
    StreetStore: "Loja de Rua",
    Flagship: "Loja Conceito"
};

export const UNIT_TYPE = ["Own", "Franchise"] as const;
export type UnitType = typeof UNIT_TYPE[number];

export const UNIT_TYPE_LABEL: Record<UnitType, string> = {
    Own: "Própria",
    Franchise: "Franqueado"
};

export const unitSchema = z.object({
    id: z.uuidv7("ID inválido"),
    name: z.string().min(3, "Nome deve ter pelo menos 3 caracteres").max(150, "Nome muito grande"),
    status: z.enum(UNIT_STATUS, "Selecione um status válido"),
    size: z.enum(UNIT_SIZE, "Selecione um tamanho válido"),
    type: z.enum(UNIT_TYPE, "Selecione um tipo válido"),
    cep: z.string().min(8, "CEP deve ter 8 dígitos").max(9, "CEP inválido"),
    street: z.string().min(2, "Rua é obrigatória").max(200, "Nome da rua muito grande"),
    number: z.string().min(1, "Número é obrigatório").max(20, "Número muito grande"),
    neighborhood: z.string().min(2, "Bairro é obrigatório").max(100, "Nome do bairro muito grande"),
    city: z.string().min(2, "O nome da cidade deve ter pelo menos 2 caracteres").max(100, "O nome da cidade é muito grande"),
    state: z.string().min(2, "A sigla deve ter 2 letras").max(2, "A sigla deve ter 2 letras"),
    main_office_id: z.uuidv7("ID da matriz inválido"),
    royalties_percentage: z.number().min(1, "A taxa mínima é de 1%").max(100, "A taxa máxima é de 100%").nullable(),
});

export type Unit = z.infer<typeof unitSchema>;

//===========================================
//                  UI
//===========================================

export const tableUnitSchema = unitSchema.pick({
    id: true,
    name: true,
    status: true,
    size: true,
    city: true,
    state: true,
}).extend({
    revenue: z.number().nonnegative(),
});

export type tableUnit = z.output<typeof tableUnitSchema>;

//===========================================
//                  Cases
//===========================================

export const unitMostRevenue = unitSchema.pick({
    name: true,
}).extend({
    revenue: z.number().nonnegative(),
});
export type UnitMostRevenueType = z.infer<typeof unitMostRevenue>;

export const unitsMetricsSchema = z.object({
    mostRevenue: unitMostRevenue,
    decrease: z.number(),
    health: z.string()
});

export type unitsMetricsType = z.infer<typeof unitsMetricsSchema>