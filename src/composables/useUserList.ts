import { GET } from "@/utils/api/user";
import { useQuery } from "@tanstack/vue-query";

export function useUserList() {
    return useQuery({
        queryKey: ['users', 'list'],
        queryFn: GET,
        refetchInterval: 1000 * 120
    })
}