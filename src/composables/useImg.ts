import { get, post, getInTrash, delete_ } from '@/repositories/img.ts'
import { useMutation, useQuery, useQueryClient } from "@tanstack/vue-query";
import { imgType } from '@/schema/ImgSchema';



export function useGetImg() {
    return useQuery<imgType[]>({
        queryKey: ["imgs"],
        queryFn: get,
        staleTime: 1000 * 60 * 15,
    })
}

export function usePostImg() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: Partial<imgType>) => post(data),
        onSuccess: () => {
            queryClient.invalidateQueries(["imgs"]);
        }
    })
}
export function useGetTrashedImg() {
    return useQuery<imgType[]>({
        queryKey: ["trashedImgs"],
        queryFn: getInTrash,
        staleTime: 1000 * 60 * 15,
    })
}

export function useDeleteImg() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => delete_(id),
        onSuccess: () => {
            queryClient.invalidateQueries(["trashedImgs"]);
        }
    })
}