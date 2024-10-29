import api from "@/api";

export const getAccounts = async (email: string) => {
    const response = await api.get(`/accounts/user/${email}`)
    return response.data
}