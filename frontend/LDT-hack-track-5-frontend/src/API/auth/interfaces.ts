export interface registerData {
  name: string;
  email: string;
  password: string;
}

export interface role {
  roleId: number;
  companyId: number;
  name: string;
}

export interface company {
  name: string;
  description: string;
  email: string;
  phone: string;
  website: string;
}

export interface jwt {
  token: string;
  roleName: role[];
}

export interface registerCompanyData {
  companyDTO: company;
  registrationAdminDTO: registerData;
}

export interface registerCompanyResponse {
  company: company;
  jwt: jwt;
}

export interface loginData {
  email: string;
  password: string;
}
