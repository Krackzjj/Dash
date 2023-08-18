import { z } from 'zod';
const env = import.meta.env;

const envSchema = z.object({
    VITE_API_URL: z.string().url(),
    VITE_TRASH_LIFETIME: z.string().transform((val) => {
        const num = parseInt(val);
        return num;
    }).default("24"),
    VITE_TRASH_LIFETIME_UNIT: z.enum(['years', 'months', 'days', 'hours', 'minutes', 'seconds']).default('hours'),
});

export const envConfig = envSchema.transform((val) => {
    return {
        API_URL: val.VITE_API_URL,
        TRASH_LIFETIME: val.VITE_TRASH_LIFETIME,
        TRASH_LIFETIME_UNIT: val.VITE_TRASH_LIFETIME_UNIT,
    }
}).parse(env);
