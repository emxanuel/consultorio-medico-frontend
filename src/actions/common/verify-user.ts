import api from "@/api";

export const verifyUser = async (email: string) => {
    const response = await api.get(`/users/verify?email=${email}`);
    return response.data;
}