import api from "@/api";
import { IGetVisitsResponse } from "@/types";
import dayjs from "dayjs";

export const getConsultations = async (
  name: string | null,
  from: string | null,
  to: string | null,
  statuses: string[],
  accountKey: string,
  token: string
) => {
  try {
    let query = `?accountKey=${accountKey}&name=${name}&`;
    if (from && to) {
      query =
        query +
        `dateRange=${dayjs(from).format("YYYY-MM-DD")},${dayjs(to).format(
          "YYYY-MM-DD"
        )}&`;
    }
    statuses.map((status) => {
      query = query + `${status}=true&`;
    });
    const response = await api.get<IGetVisitsResponse>(`/visits${query}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(String(error));
  }
};
