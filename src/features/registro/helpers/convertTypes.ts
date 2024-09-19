import {
  FormData,
  Insurance,
  Patient,
  EmergencyContact,
  Gender,
  MaritalStatus,
  Visit,
} from "@/types";

export function convertFormData(data: FormData) {
  const patient: Patient = {
    first_name: data.firstName,
    last_name: data.lastName,
    age: parseInt(data.age), // converting age from string to number
    gender: Object.keys(Gender).find((key) => Gender[key as keyof typeof Gender] === data.gender) as Gender,
    marital_status: Object.keys(MaritalStatus).find((key) => MaritalStatus[key as keyof typeof MaritalStatus] === data.maritalStatus) as MaritalStatus,
    birth_date: data.birthDate,
    birth_place: data.birthPlace,
    nationality: data.nationality,
    religion: data.religion || undefined,
    occupation: data.ocupation || undefined,
    document_id: data.documentId,
    address: data.address,
    residential_phone: data.residentialPhone || undefined,
    cellphone: data.cellphone,
  };

  const emergencyContact: EmergencyContact = {
    name: data.emergencyContactName,
    residential_phone: data.emergencyContactResidentialPhone || undefined,
    cellphone: data.emergencyContactCellphone,
    relationship: data.emergencyContactRelationship,
    address: data.emergencyContactAddress,
  };

  const insurance: Insurance = {
    has_assurance: data.hasAssurance,
    ars_name: data.ARSName || undefined,
    ars_cardholder: data.ARSCardholder || undefined,
    ars_primary_insured: data.ARSPrimaryInsured || undefined,
    ars_plan: data.ARSPlan || undefined,
    ars_contract_number: data.ARSContractNumber || undefined,
    ars_primary_insured_relationship:
      data.ARSPrimaryInsuredRelationship || undefined,
  };

  const visit: Visit = {
    reason: data.reason,
    visit_date: new Date().toISOString(),
  };

  return { patient, emergencyContact, insurance, visit };
}
