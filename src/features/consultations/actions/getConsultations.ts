import api from "@/api";
import dayjs from "dayjs";

export const getConsultations = async (
  name: string | null,
  from: string | null,
  to: string | null,
  statuses: string[]
) => {
  try {
    let query = `?name=${name}&dateRange=${dayjs(from).toISOString()},${dayjs(to).toISOString()}&`;
    statuses.map((status) => {
      query = query + (`${status}=true&`);
    });
    console.log(query);

    const response = await api.get(`/visits${query}`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error(String(error));
  }
};
