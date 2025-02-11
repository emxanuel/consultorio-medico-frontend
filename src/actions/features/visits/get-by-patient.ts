import api from "@/api";
import { IGetVisitsByPatientResponse } from "@/types/visits";

export const getConsultationsByPatient = async (documentId: string, token: string) => {
  try {
    const response = await api.get<IGetVisitsByPatientResponse>(`/visits/patient/${documentId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  }
  catch (error) {
    throw new Error(String(error));
  }
}