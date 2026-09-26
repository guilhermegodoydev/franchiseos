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
    id: z.uuidv7(),
    name: z.string().min(3, "Nome deve ter pelo menos 3 caracteres").max(200, "Nome muito grande"),
    city: z.string().min(2).max(200, "O nome da cidade é muito grande"),
    state: z.string().min(2, "A sigla deve ter 2 letras").max(2, "A sigla deve ter 2 letras"),
    royalties_percentage: z.number().min(0, "A taxa mínima é de 0%").max(100, "A taxa máxima é de 100%").nonnegative().nullable(),
    status: z.enum(UNIT_STATUS),
    type: z.enum(UNIT_TYPE),
    size: z.enum(UNIT_SIZE),
    main_office_id: z.uuidv7(),
    manager_name: z.string().min(3, "Nome deve ter pelo menos 3 caracteres").max(200, "Nome muito grande"),
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