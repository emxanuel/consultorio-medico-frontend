export type FormData = {
    firstName: string,
    lastName: string,
    age: string,
    gender: Gender | "",
    maritalStatus: MaritalStatus | "",
    birthDate: string,
    birthPlace: string,
    nationality: string,
    religion: string,
    ocupation: string,
    documentId: string,
    address: string,
    residentialPhone: string,
    cellphone: string,
    emergencyContactName: string,
    emergencyContactResidentialPhone: string,
    emergencyContactCellphone: string,
    emergencyContactRelationship: string,
    emergencyContactAddress: string,
    hasAssurance: boolean,
    ARSName?: string,
    ARSCardholder?: string,
    ARSPrimaryInsured?: string,
    ARSPlan?: string,
    ARSContractNumber?: string,
    ARSPrimaryInsuredRelationship?: PrimaryInsuredRelationship | ""
}

export enum MaritalStatus {
    married = "Casado",
    single = "Soltero",
    widowed = "Viudo",
    minor = "Menor"
}

export enum PrimaryInsuredRelationship {
    spouse = "Esposo",
    child = "Hijo",
    dependent = "Dependiente"
}

export enum Gender {
    masculine = "Masculino",
    feminine = "Femenino"
}