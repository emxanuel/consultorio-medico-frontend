import api from "@/api";
import { IGetAccountResponse } from "@/types/accounts";
import { getAccessToken } from "@auth0/nextjs-auth0";

export const getAccount = async (key: string, accessToken?: string) => {
    let token = ''

    if (accessToken) {
        token = accessToken
    } else {
        const { accessToken } = await getAccessToken()
        token = accessToken || ''
    }
    const response = await api.get<IGetAccountResponse>(`/accounts/${key}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
    return response.data
}