import api from "@/api";

export const createUser = async (email: string, firstName: string, lastName: string, accountName: string) => {
    const response = await api.post('/users', { email, firstName, lastName, accountName, isAdmin: true })
    return response.data
}