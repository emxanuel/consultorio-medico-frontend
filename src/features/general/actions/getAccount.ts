import api from "@/api";

export const getAccount = async (key: string) => {
    const response = await api.get(`/accounts/${key}`)
    return response.data
}