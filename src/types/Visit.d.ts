export type Visit = {
  id?: number;
  patient_id?: number;
  visit_date: string;
  reason: string;
  diagnosis?: string;
  treatment?: string;
};
