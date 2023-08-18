import { get, post, getInTrash, delete_, update, restore, deleteMany } from '@/repositories/img.ts'
import { useMutation, useQuery, useQueryClient } from "@tanstack/vue-query";
import { imgType } from '@/schema/ImgSchema';

import useToast from './useToast';


export function useGetImg() {
    return useQuery<imgType[]>({
        queryKey: ["imgs"],
        queryFn: () => get(),
        staleTime: 1000 * 60 * 15,
    })
}

export function useGetImgById(id: string) {
    return useQuery<imgType[]>({
        queryKey: ["imgs", id],
        queryFn: () => get(id),
        staleTime: 1000 * 60 * 15,
    })
}

export function useGetTrashedImg() {
    return useQuery<imgType[]>({
        queryKey: ["trash"],
        queryFn: () => getInTrash(),
        staleTime: 1000 * 60 * 15,
    })
}

export function usePostImg() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: Partial<imgType> | Partial<imgType>[]) => post(data),
        onSuccess: () => {
            queryClient.invalidateQueries(["imgs"]);
        },
        onError: () => {
            useToast({ type: 'danger', message: 'Une erreur est survenue !', icon: 'warning' });
        }
    })
}


export function useUpdateImg() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, data }: { id: string, data: Partial<imgType> }) => update(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries(["imgs"]);
            queryClient.invalidateQueries(["trash"]);
        }
    })
}

export function useRestoreImg() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => restore(id),
        onSuccess: () => {
            queryClient.invalidateQueries(["imgs"]);
            queryClient.invalidateQueries(["trash"]);
            useToast({ type: 'danger', message: 'Image restaurée !', icon: 'check' });
        },
        onError: () => {
            useToast({ type: 'danger', message: 'Une erreur est survenue !', icon: 'warning' });
        }
    })
}

export function useDeleteImg() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: string[]) => deleteMany(id),
        onSuccess: () => {
            queryClient.invalidateQueries(["imgs"]);
            queryClient.invalidateQueries(["trash"]);
        }
    })
}

export function useForceDelete() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: string) => delete_(id, true),
        onSuccess: () => {
            queryClient.invalidateQueries(["imgs"]);
            queryClient.invalidateQueries(["trash"]);
        }
    })
}