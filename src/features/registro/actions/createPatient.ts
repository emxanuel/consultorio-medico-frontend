import api from "@/api";
import { convertFormData } from "../helpers/convertTypes";
import { FormData } from "@/types";

export const createPatient = async (data: FormData, isAdmin: boolean = true, enterpriseId: number) => {
    const {insurance, patient, emergencyContact, visit} = convertFormData(data);
    try {
        const response = await api.post("/patients", {
            insuranceInfo: insurance,
            patientInfo: patient,
            emergencyContactInfo: emergencyContact,
            visitInfo: visit,
            isAdmin,
            enterpriseId
        });
        return response.data;
    } catch (error) {
        throw new Error(String(error));
    }
}