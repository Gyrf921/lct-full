import axios, { AxiosResponse } from 'axios';
import { URL } from '..';
import {
  loginData,
  jwt,
  registerCompanyData,
  registerCompanyResponse,
  registerData,
} from './interfaces';

export const register = async (data: registerData) => {
  const response: AxiosResponse<jwt> = await axios.post(
    URL + '/login/registration',
    data
  );
  return response.data;
};

export const registerCompany = async (data: registerCompanyData) => {
  const response: AxiosResponse<registerCompanyResponse> = await axios.post(
    URL + '/login/company',
    data
  );
  return response.data;
};

export const login = async (data: loginData) => {
  const response: AxiosResponse<jwt> = await axios.post(
    URL + '/login/authentication',
    data
  );
  return response.data;
};
