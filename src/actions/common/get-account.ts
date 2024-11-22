import api from "@/api";
import { getAccessToken } from "@auth0/nextjs-auth0";

export const getAccount = async (key: string) => {
    const { accessToken } = await getAccessToken()
    const response = await api.get(`/accounts/${key}`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    })
    return response.data
}