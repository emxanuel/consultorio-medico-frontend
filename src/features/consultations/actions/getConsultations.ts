import api from "@/api";

export const getConsultations = async (
  name: string | null,
  from: string | null,
  to: string | null,
  statuses: string[]
) => {
  try {
    let query = `?name=${name}&dateRange=${from},${to}&`;
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
