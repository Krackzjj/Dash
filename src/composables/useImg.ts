import { get, post } from '@/repositories/img.ts'
import { useQuery } from "@tanstack/vue-query";
import { imgSchemaType } from '@/schema/ImgSchema';

export function useGetImg() {
    return useQuery<imgSchemaType[]>({
        queryKey: ["imgs"],
        queryFn: get,
        staleTime: 1000 * 60 * 15,
    })
}