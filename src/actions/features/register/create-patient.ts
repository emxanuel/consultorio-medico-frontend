import api from "@/api";
import { convertFormData } from "@/helpers/features/register/convertTypes";
import { FormData } from "@/types/form-data";

export const createPatient = async (data: FormData, accountKey: string, token: string) => {
    const {insurance, patient, emergencyContact, visit} = convertFormData(data);
    try {
        const response = await api.post("/patients", {
            insuranceInfo: insurance,
            patientInfo: patient,
            emergencyContactInfo: emergencyContact,
            visitInfo: visit,
            accountKey,
        }, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        return response.data;
    } catch (error) {
        throw new Error(String(error));
    }
}