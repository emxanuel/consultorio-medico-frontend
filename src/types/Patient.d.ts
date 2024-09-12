export type Patient = {
  id?: number;
  first_name: string;
  last_name: string;
  age: number;
  gender: Gender;
  marital_status: MaritalStatus;
  birth_date: string;
  birth_place: string;
  nationality: string;
  religion?: string;
  occupation?: string;
  document_id: string;
  address: string;
  residential_phone?: string;
  cellphone: string;
};
