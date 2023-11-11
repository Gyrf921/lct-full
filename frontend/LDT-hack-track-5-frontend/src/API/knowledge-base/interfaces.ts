import { department, post } from '../admin/interfaces';

export interface ArticlesName {
  id: number;
  name: string;
}

export interface Question {
  questionId: number;
  companyId: number;
  imagePath: string;
  theme: string;
  answer: string;
}

export interface Article {
  created: string;
  articleId: number;
  companyId: number;
  imagePath: string;
  department: department;
  post: post;
  theme: string;
  information: string;
}

export interface media {
  id: number;
  url: string;
  name: string;
  description: string;
  postName: string;
}
