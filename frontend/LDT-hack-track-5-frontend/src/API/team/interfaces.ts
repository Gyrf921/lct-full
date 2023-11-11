import { role } from '../auth/interfaces.ts';

export interface employeeTeam {
  employeeId: number;
  imagePath: string;
  name: string;
  city: string;
  postName: string;
  network: string;
  email: string;
  phone: string;
  roles: role[];
}
