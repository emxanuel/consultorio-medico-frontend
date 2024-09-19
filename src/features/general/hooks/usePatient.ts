import { useQuery } from "@tanstack/react-query";
import { getPatient } from "../actions/patients/getPatient";

export const usePatient = (id: number) => {
    const patientQuery = useQuery({
        queryKey: ['patient', id],
        queryFn: () => getPatient(id)
    })

    return { patientQuery }
}