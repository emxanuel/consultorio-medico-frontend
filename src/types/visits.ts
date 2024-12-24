import { Patient } from "./patients";

export type Visit = {
  id?: number;
  patient_id?: number;
  visit_date: string;
  reason: string;
  diagnosis?: string;
  treatment?: string;
};

export type IGetVisitsResponse = Visit & {
  person: Patient;
}[];