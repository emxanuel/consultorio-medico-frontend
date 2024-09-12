import api from "@/api";

export const getConsultations = async () => {
    try {
        const response = await api.get("/visits");
        return response.data;
    } catch (error) {
        console.log(error)
        throw new Error(String(error));
    }
}