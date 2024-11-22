import api from "@/api";
import { getAccessToken } from "@auth0/nextjs-auth0";

export const getAccounts = async (email: string) => {
    const { accessToken } = await getAccessToken()
    const response = await api.get(`/accounts/user/${email}`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    })
    return response.data
}