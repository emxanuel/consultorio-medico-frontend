import { getConsultationsByPatient } from "@/actions/features/visits/get-by-patient"
import { useQuery } from "@tanstack/react-query"

export const useConsultationsByPatient = (documentId: string, token: string) => {
    const consultationsByPatientQuery = useQuery({
        queryKey: ['consultations', 'patient', documentId],
        queryFn: () => getConsultationsByPatient(documentId, token),
        staleTime: 0,
        retry: false
    })

    return {
        consultationsByPatientQuery
    }
}