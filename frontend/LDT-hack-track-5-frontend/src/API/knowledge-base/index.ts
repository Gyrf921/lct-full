import axios, { AxiosResponse } from 'axios';
import { URL } from '..';
import { headers } from '../';
import { Article, ArticlesName, Question, media } from './interfaces';

export const deleteFromFavorites = async (articleID: number) => {
  const response = await axios.delete(
    URL + `/knowledge-base/favorites/articles/${articleID}`,
    { headers: { ...headers } }
  );
  return response;
};

export const addToFavorites = async (articleID: number) => {
  const response = await axios.post(
    URL + `/knowledge-base/favorites/articles/${articleID}`,
    {},
    { headers: { ...headers } }
  );
  return response;
};

export const getAllVideo = async () => {
  const response: AxiosResponse<media[]> = await axios.get(
    URL + `/knowledge-base/videos`,
    { headers: { ...headers } }
  );
  return response.data;
};

export const getVideo = async (videoId: number) => {
  const response: AxiosResponse<media> = await axios.get(
    URL + `/knowledge-base/videos/${videoId}`,
    { headers: { ...headers } }
  );
  return response.data;
};

export const getAllAudio = async () => {
  const response: AxiosResponse<media[]> = await axios.get(
    URL + `/knowledge-base/audios`,
    { headers: { ...headers } }
  );
  return response.data;
};

export const getAudio = async (audioId: number) => {
  const response: AxiosResponse<media> = await axios.get(
    URL + `/knowledge-base/audios/${audioId}`,
    { headers: { ...headers } }
  );
  return response.data;
};

export const getVideoByPost = async (postName: string) => {
  const response: AxiosResponse<media[]> = await axios.get(
    URL + `/knowledge-base/videos/posts?postName=${postName}`,
    { headers: { ...headers } }
  );
  return response.data;
};

export const getVideoByDepartment = async (departmentName: string) => {
  const response: AxiosResponse<media[]> = await axios.get(
    URL + `/knowledge-base/videos/departments?departmentName=${departmentName}`,
    { headers: { ...headers } }
  );
  return response.data;
};

export const getAudioByPost = async (postName: string) => {
  const response: AxiosResponse<media[]> = await axios.get(
    URL + `/knowledge-base/audios/posts?postName=${postName}`,
    { headers: { ...headers } }
  );
  return response.data;
};

export const getAudioByDepartment = async (departmentName: string) => {
  const response: AxiosResponse<media[]> = await axios.get(
    URL + `/knowledge-base/audios/departments?departmentName=${departmentName}`,
    { headers: { ...headers } }
  );
  return response.data;
};

export const getAllQuestions = async () => {
  const response: AxiosResponse<ArticlesName[]> = await axios.get(
    URL + `/knowledge-base/questions`,
    { headers: { ...headers } }
  );
  return response.data;
};

export const getQuestion = async (questionId: number) => {
  const response: AxiosResponse<Question> = await axios.get(
    URL + `/knowledge-base/questions/${questionId}`,
    { headers: { ...headers } }
  );
  return response.data;
};

export const getAllFavorites = async () => {
  const response: AxiosResponse<ArticlesName[]> = await axios.get(
    URL + `/knowledge-base/favorites/articles`,
    { headers: { ...headers } }
  );
  return response.data;
};

export const getAllArticles = async () => {
  const response: AxiosResponse<ArticlesName[]> = await axios.get(
    URL + `/knowledge-base/articles`,
    { headers: { ...headers } }
  );
  return response.data;
};

export const getArticle = async (articleId: number) => {
  const response: AxiosResponse<Article> = await axios.get(
    URL + `/knowledge-base/articles/${articleId}`,
    { headers: { ...headers } }
  );
  return response.data;
};

export const getArticlesByPost = async (postName: string) => {
  const response: AxiosResponse<ArticlesName[]> = await axios.get(
    URL + `/knowledge-base/articles/posts?postName=${postName}`,
    { headers: { ...headers } }
  );
  return response.data;
};

export const getArticlesByDepartments = async (departmentName: string) => {
  const response: AxiosResponse<ArticlesName[]> = await axios.get(
    URL +
      `/knowledge-base/articles/departments?departmentName=${departmentName}`,
    { headers: { ...headers } }
  );
  return response.data;
};
