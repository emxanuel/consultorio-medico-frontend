import api from "@/api";
import { IMeResponse } from "@/types/auth";

export const me = async (email: string, token: string) => {
  const response = await api.get<IMeResponse>(`/users/${email}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
