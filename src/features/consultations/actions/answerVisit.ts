import api from "@/api"

export const answerVisit = async (visitId: number, action: 'processed' | 'canceled', diagnosis: string) => {
    try {
        const response = await api.put(`/visits/${visitId}/answer`, {
            status: action,
            diagnosis
        })
        return response.data
    } catch (error) {
        throw new Error(String(error))
    }
}