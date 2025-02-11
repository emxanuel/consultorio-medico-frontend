import api from "@/api";
import { IGetVisitResponse } from "@/types/visits";

export const getConsultation = async (id: string, token: string) => {
  try {
    const response = await api.get<IGetVisitResponse>(`/visits/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(String(error));
  }
} 