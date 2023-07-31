import { z } from "zod";

export const HomeSchema = z.object({
    id: z.number().int().positive(),
    name: z.string().min(3).max(20),
    value: z.string().min(4),
})

export type Home = z.infer<typeof HomeSchema>