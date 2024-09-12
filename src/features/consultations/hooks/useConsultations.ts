import { useQuery } from "@tanstack/react-query";
import { getConsultations } from "../actions";

export const useConsultations = () => {
    const consultationsQuery = useQuery({
        queryKey: ['consultations'],
        queryFn: getConsultations,
        staleTime: 1000 * 60 * 20,
        retry: false
    })

    return {
        consultationsQuery
    }
}