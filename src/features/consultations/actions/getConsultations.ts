import api from "@/api";
import dayjs from "dayjs";

export const getConsultations = async (
  name: string | null,
  from: string | null,
  to: string | null,
  statuses: string[]
) => {
  try {
    let query = `?name=${name}&`;
    if (from && to) {
      query = query + `dateRange=${dayjs(from).format("YYYY-MM-DD")},${dayjs(to).format("YYYY-MM-DD")}&`;
    }
    statuses.map((status) => {
      query = query + (`${status}=true&`);
    });

    const response = await api.get(`/visits${query}`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error(String(error));
  }
};
