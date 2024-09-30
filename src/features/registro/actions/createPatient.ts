import api from "@/api";
import { convertFormData } from "../helpers/convertTypes";
import { FormData } from "@/types";

export const createPatient = async (data: FormData, accountKey: string) => {
    const {insurance, patient, emergencyContact, visit} = convertFormData(data);
    try {
        const response = await api.post("/patients", {
            insuranceInfo: insurance,
            patientInfo: patient,
            emergencyContactInfo: emergencyContact,
            visitInfo: visit,
            accountKey,
        });
        return response.data;
    } catch (error) {
        throw new Error(String(error));
    }
}