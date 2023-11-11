import { role } from '../auth/interfaces';
import { employee, task } from '../hr/interfaces';
import { Article } from '../knowledge-base/interfaces';

export interface addMedia {
  postName: string;
  url: string;
  name: string;
  description: string;
}

export interface questionData {
  imagePath: string;
  theme: string;
  answer: string;
}

export interface question {
  questionId: number;
  companyId: number;
  imagePath: string;
  theme: string;
  answer: string;
}

export interface productData {
  imagePath: string;
  name: string;
  description: string;
  cost: number;
}

export interface product {
  productId: number;
  companyId: number;
  imagePath: string;
  name: string;
  description: string;
  cost: number;
}

export interface postData {
  name: string;
  departmentName: string;
}

export interface post {
  postId: number;
  companyId: number;
  department: department;
  name: string;
}

export interface AddEmployeeData {
  name: string;
  email: string;
  postName: string;
  roleName: string;
  curatorEmail?: string;
}

export type departmentData = string;

export interface department {
  departmentId: number;
  companyId: number;
  name: string;
}

export interface articleData {
  postName: string;
  imagePath?: string;
  theme: string;
  information: string;
}

export interface mediaFull {
  created: string;
  videoId: number;
  companyId: number;
  department: department;
  post: post;
  url: string;
  name: string;
  description: string;
}

export interface achievement {
  achievementId: number;
  imagePath: string;
  title: string;
  description: string;
}

export interface company {
  companyId: number;
  name: string;
  description: string;
  email: string;
  phone: string;
  website: string;
  roles: role[];
  departments: department[];
  posts: post[];
  employees: employee[];
  questions: question[];
  products: product[];
  articles: Article[];
  videos: mediaFull[];
  audio: mediaFull[];
  tasks: task[];
  achievements: achievement[];
}
