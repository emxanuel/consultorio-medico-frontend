import api from "@/api";

export const createPatient = async (data: FormData) => {
    try {
        const response = await api.post("/patients", data);
        return response.data;
    } catch (error) {
        throw new Error(String(error));
    }
}