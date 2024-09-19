import { useQuery } from "@tanstack/react-query";
import { getConsultations } from "../actions";

export const useConsultations = (name: string | null, from: string | null, to: string | null, statuses: string[]) => {
    const consultationsQuery = useQuery({
        queryKey: ['consultations'],
        queryFn: () => getConsultations(name, from, to, statuses),
        staleTime: 1000 * 60 * 20,
        retry: false
    })

    return {
        consultationsQuery
    }
}