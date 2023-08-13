import { z } from 'zod';

export enum IMG_TYPES {
    png = 'png',
    jpg = 'jpg',
    jpeg = 'jpeg',
    gif = 'gif',
    svg = 'svg',
    webp = 'webp',
    ico = 'ico',
    bmp = 'bmp'
}


export const imgSchema = z.object({
    id: z.string().max(21),
    name: z.string().max(255),
    path: z.string().max(255),
    type: z.string().max(50),
    dimensions: z.string().max(50),
    external: z.boolean(),
    published: z.boolean(),
    description: z.string().max(160).nullable(),
    inserted_at: z.date(),
    deleted_at: z.date().nullable()
});

imgSchema.refine(data => {
    return Object.values(IMG_TYPES).includes(data.type as IMG_TYPES),
    {
        message: 'unknown image type',
        path: ['type']
    }
})

export type imgType = z.infer<typeof imgSchema>;