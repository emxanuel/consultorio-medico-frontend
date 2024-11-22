import api from "@/api";
import { getAccessToken } from "@auth0/nextjs-auth0";

export const verifyUser = async (email: string) => {
    const { accessToken } = await getAccessToken()
    const response = await api.get(`/users/verify?email=${email}`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
    return response.data;
}