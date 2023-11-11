import axios, { AxiosResponse } from 'axios';
import { department, post } from '../admin/interfaces.ts';
import { headers, URL } from '../index.ts';
import { task } from '../hr/interfaces.ts';

export const getPosts = async () => {
  const response: AxiosResponse<post[]> = await axios.get(
    URL + `/company/posts`,
    { headers: { ...headers } }
  );
  return response.data;
};

export const getCompanyDep = async () => {
  const response: AxiosResponse<department[]> = await axios.get(
    URL + `/company/departments`,
    { headers: { ...headers } }
  );
  return response.data;
};

export const getCompanyRoles = async () => {
  const response: AxiosResponse<department> = await axios.get(
    URL + `/company/roles`,
    { headers: { ...headers } }
  );
  return response.data;
};

export const getCompanyTaskById = async (id: number) => {
  const response: AxiosResponse<task> = await axios.get(
    URL + `/company/tasks/${id}`,
    { headers: { ...headers } }
  );
  return response.data;
};
