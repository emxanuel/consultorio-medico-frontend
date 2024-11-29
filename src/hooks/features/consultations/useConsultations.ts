import { useQuery } from "@tanstack/react-query";
import { getConsultations } from "@/actions/features/consultations";
import { useUser } from "@auth0/nextjs-auth0/client";
import { getSession } from "@auth0/nextjs-auth0";
import { userStore } from "@/store/user-store";

export const useConsultations = (name: string | null, from: string | null, to: string | null, statuses: string[], accountKey: string, token: string) => {
    const consultationsQuery = useQuery({
        queryKey: ['consultations'],
        queryFn: () => getConsultations(name, from, to, statuses, accountKey, token),
        staleTime: 0,
        retry: false
    })

    return {
        consultationsQuery
    }
}