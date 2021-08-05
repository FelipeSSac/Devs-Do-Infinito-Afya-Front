export interface IAutoMedRec {
  id: string,
  attendance_date: string,
  specialist_name: string,
  attendance_time: string,
  client_name: string,
  email_client: string,
  attendance_value: string,
  attendance_status: string,
  FK_id_med_reg: string,
  FK_id_specialist: string,
}

export interface IPatientId {
  name: string;
  cpf: string;
  phone?: string;
  cellphone?: string;
  email: string;
  blood_type: bloodType | unknown;
  zip_code: string;
  street: string;
  number: string;
  district: string;
  locale: string;
  uf: string;
}

export interface IProId {
  name: string;
  cpf: string;
  phone?: string;
  cellphone?: string;
  email: string;
  id_profession: string | unknown;
  zip_code: string;
  street: string;
  number: string;
  district: string;
  locale: string;
  uf: string;
  register: string;
}


export interface IProfession {
  id: number,
  name: string,
}

export interface IProfessional {
  id: string,
  name: string,
  id_profession: string,
}

export interface IPatient {
  id: string,
  name: string,
  cpf: string,
}

export interface IZipContent {
  cep: string
}

export enum bloodType {
  'A+',
  'A-',
  'B+',
  'B-',
  'O+',
  'O-',
  'AB+',
  'AB-'
}