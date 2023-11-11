import axios, { AxiosResponse } from 'axios';
import { URL } from '..';
import { headers } from '../';
import { employee } from '../hr/interfaces';
import { Article, ArticlesName, Question } from '../knowledge-base/interfaces';
import {
  AddEmployeeData,
  addMedia,
  articleData,
  company,
  department,
  departmentData,
  mediaFull,
  post,
  postData,
  product,
  productData,
  question,
  questionData,
} from './interfaces';

export const addVideos = async (data: addMedia[]) => {
  const response: AxiosResponse<mediaFull[]> = await axios.post(
    URL + `/admin/knowledge-base/videos`,
    data,
    { headers: { ...headers } }
  );
  return response.data;
};

export const addOneVideo = async (data: addMedia) => {
  const response: AxiosResponse<mediaFull[]> = await axios.post(
    URL + `/admin/knowledge-base/video`,
    data,
    { headers: { ...headers } }
  );
  return response.data;
};

export const addAudios = async (data: addMedia[]) => {
  const response: AxiosResponse<mediaFull[]> = await axios.post(
    URL + `/admin/knowledge-base/audios`,
    data,
    { headers: { ...headers } }
  );
  return response.data;
};

export const addOneAudio = async (data: addMedia) => {
  const response: AxiosResponse<mediaFull[]> = await axios.post(
    URL + `/admin/knowledge-base/audio`,
    data,
    { headers: { ...headers } }
  );
  return response.data;
};
export const addQuestions = async (data: questionData[]) => {
  const response: AxiosResponse<question[]> = await axios.post(
    URL + `/admin/knowledge-base/questions`,
    data,
    { headers: { ...headers } }
  );
  return response.data;
};
export const addQuestion = async (data: questionData) => {
  const response: AxiosResponse<ArticlesName[]> = await axios.post(
    URL + `/admin/knowledge-base/question`,
    data,
    { headers: { ...headers } }
  );
  return response.data;
};

export const addArticle = async (data: articleData) => {
  const response: AxiosResponse<ArticlesName[]> = await axios.post(
    URL + `/admin/knowledge-base/article`,
    data,
    { headers: { ...headers } }
  );
  return response.data;
};

export const updateArticle = async (articleId: number, data: articleData) => {
  const response: AxiosResponse<Article> = await axios.put(
    URL + `/admin/knowledge-base/articles/${articleId}`,
    data,
    { headers: { ...headers } }
  );
  return response.data;
};

export const deleteArticle = async (articleId: number) => {
  const response: AxiosResponse<Article[]> = await axios.delete(
    URL + `/admin/knowledge-base/articles/${articleId}`,
    { headers: { ...headers } }
  );
  return response.data;
};

export const updateQuestion = async (
  questionId: number,
  data: questionData
) => {
  const response: AxiosResponse<Question> = await axios.put(
    URL + `/admin/knowledge-base/questions/${questionId}`,
    data,
    { headers: { ...headers } }
  );
  return response.data;
};

export const deleteQuestion = async (questionId: number) => {
  const response: AxiosResponse<Question[]> = await axios.delete(
    URL + `/admin/knowledge-base/questions/${questionId}`,
    { headers: { ...headers } }
  );
  return response.data;
};

export const addArticles = async (data: articleData[]) => {
  const response: AxiosResponse<Article[]> = await axios.post(
    URL + `/admin/knowledge-base/articles`,
    data,
    { headers: { ...headers } }
  );
  return response.data;
};

export const addProducts = async (data: productData[]) => {
  const response: AxiosResponse<product[]> = await axios.post(
    URL + `/admin/company/products`,
    data,
    { headers: { ...headers } }
  );
  return response.data;
};

export const addPosts = async (data: postData[]) => {
  const response: AxiosResponse<post[]> = await axios.post(
    URL + `/admin/company/posts`,
    data,
    { headers: { ...headers } }
  );
  return response.data;
};

export const addListOfEmployees = async (data: AddEmployeeData[]) => {
  const response: AxiosResponse<employee[]> = await axios.post(
    URL + `/admin/company/employees`,
    data,
    { headers: { ...headers } }
  );
  return response.data;
};

export const addListOfDepartments = async (data: departmentData[]) => {
  const response: AxiosResponse<department[]> = await axios.post(
    URL + `/admin/company/posts`,
    data,
    { headers: { ...headers } }
  );
  return response.data;
};

export const getCompany = async () => {
  const response: AxiosResponse<company> = await axios.get(
    URL + `/admin/company/`,
    { headers: { ...headers } }
  );
  return response.data;
};
