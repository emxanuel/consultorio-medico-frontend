import api from "@/api";
import { Patient } from "@/types";

export const getPatient = async (id: number) => {
    const response = await api.get<Patient>(`/patients/${id}`);
    return response.data;
}