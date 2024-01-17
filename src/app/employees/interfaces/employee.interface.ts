export interface Employee {
  id: number;
  name: string;
  lastname: string;
  email: string;
  phone: string;
  address: string;
  boss?: string;
  job: string;
  department: string;
  birthdate: Date;
  hiredate: Date;
  firedate?: Date;
}