import { Patient } from "./patients";

export type Visit = {
  id?: number;
  patient_id?: number;
  visit_date: string;
  reason: string;
  diagnosis?: string;
  treatment?: string;
  status: number;
};

export type IGetVisitResponse = Visit & {
  person: Patient;
}

export type IGetVisitsResponse = Visit & {
  person: Patient;
}[];

export type IGetVisitsByPatientResponse = {
  visits: Visit[];
  patient: Patient;
}