import api from "@/api";
import { IGetAccountsResponse } from "@/types/accounts";
import { getAccessToken } from "@auth0/nextjs-auth0";

export const getAccounts = async (email: string, accesToken?: string) => {
    let token = ''
    if (accesToken){
        token = accesToken
    }
    else {
        const { accessToken } = await getAccessToken()
        token = accessToken || ''
    }
    const response = await api.get<IGetAccountsResponse>(`/accounts/user/${email}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
    return response.data
}