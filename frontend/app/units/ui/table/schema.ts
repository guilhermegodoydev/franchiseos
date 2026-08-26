import z from "zod";
import { unitSchema } from "../../schema";

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