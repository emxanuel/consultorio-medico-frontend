import api from "@/api";
import { convertFormData } from "../helpers/convertTypes";
import { FormData } from "@/types";

export const createPatient = async (data: FormData) => {
    const {insurance, patient, emergencyContact, visit} = convertFormData(data);
    try {
        const response = await api.post("/patients", {
            insuranceInfo: insurance,
            patientInfo: patient,
            emergencyContactInfo: emergencyContact,
            visitInfo: visit,
        });
        return response.data;
    } catch (error) {
        throw new Error(String(error));
    }
}