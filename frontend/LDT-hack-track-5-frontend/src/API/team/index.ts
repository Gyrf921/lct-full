import axios, { AxiosResponse } from 'axios';
import { URL } from '..';
import { headers } from '../';
import { EmployeeData } from '../personal-account/interfaces';
import { employeeTeam } from './interfaces';

export interface queryParams {
  departmentName?: string;
  postName?: string;
  cityName?: string;
  employeeName?: string;
}

export const getTeam = async (data?: queryParams) => {
  const queryParams = {
    departmentName: data?.departmentName,
    postName: data?.postName,
    cityName: data?.cityName,
    employeeName: data?.employeeName,
  };

  Object.keys(queryParams).forEach((key) => {
    if (
      queryParams[key as keyof queryParams] == null ||
      queryParams[key as keyof queryParams] === ''
    ) {
      delete queryParams[key as keyof queryParams];
    }
  });

  const response: AxiosResponse<employeeTeam[]> = await axios.get(
    URL + `/team`,

    { headers: { ...headers }, params: queryParams }
  );
  return response.data;
};

export const getInternById = async (id: number) => {
  const response: AxiosResponse<EmployeeData> = await axios.get(
    URL + `/team/${id}`,
    { headers: { ...headers } }
  );
  return response.data;
};
