import { get } from '@/repositories/img.ts'
import { useQuery } from "@tanstack/vue-query";
import { imgSchemaType } from '@/schema/ImgSchema';

export function useImg() {
    return useQuery<imgSchemaType[]>({
        queryKey: ["imgs"],
        queryFn: get,
    })
}