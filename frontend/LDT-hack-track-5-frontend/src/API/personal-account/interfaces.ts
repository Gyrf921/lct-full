import { post } from '../admin/interfaces';
import { role } from '../auth/interfaces';

export interface EmployeeData {
  employeeId: number;
  imagePath: string;
  email: string;
  post: post;
  roles: role[];
  name: string;
  phone: string;
  city: string;
  socialNetwork: string;
  account: number;
  roles: role[];
  countCompletedTask: number;
}

export interface updatePersonal {
  imagePath: string;
  name: string;
  phone: string;
  socialNetwork: string;
  city: string;
}
