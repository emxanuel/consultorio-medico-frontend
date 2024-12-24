import api from "@/api";
import { IGetVisitsResponse } from "@/types";

export const getConsultationsByPatient = async (documentId: string, token: string) => {
  try {
    const response = await api.get<IGetVisitsResponse>(`/visits/patient/${documentId}`, {
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