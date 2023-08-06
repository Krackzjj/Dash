import { z } from 'zod';

export const imgSchema = z.object({
    id: z.number(),
    name: z.string().min(1).max(255),
    path: z.string().url(),
    type: z.string().min(1).max(50),
    //ajouté un enum pour les types
    dimensions: z.string().min(1).max(50),
    external: z.number().min(0).max(1),
    published: z.number().min(0).max(1),
});

export type imgSchemaType = z.infer<typeof imgSchema>;