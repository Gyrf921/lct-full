import axios, { AxiosResponse } from 'axios';
import { URL } from '..';
import { taskToIntern } from '../intern/interfaces';
import { headers } from '../';
import { employeeData } from '../admin/interfaces.ts';
import {
  addStage,
  createInternData,
  employee,
  stage,
  task,
  tasksToAdd,
} from './interfaces';

// export const getAllTasks = async () => {
//   const response: AxiosResponse<task[]> = await axios.get(URL + `/hr/tasks`, {
//     headers: { ...headers },
//   });
//   return response.data;
// };
export const addListOfTasks = async (data: tasksToAdd[]) => {
  const response: AxiosResponse<task[]> = await axios.post(
    URL + `/hr/tasks`,
    data,
    { headers: { ...headers } }
  );
  return response.data;
};

export const addListOfTasksBase = async (data: tasksToAdd[]) => {
  const response: AxiosResponse<task[]> = await axios.post(
    URL + `/hr/tasks/base`,
    data,
    { headers: { ...headers } }
  );
  return response.data;
};
export const createStage = async (internId: number, data: addStage) => {
  const response: AxiosResponse<stage[]> = await axios.post(
    URL + `/hr/interns/${internId}/stage`,
    data,
    { headers: { ...headers } }
  );
  return response.data;
};
export const createIntern = async (data: createInternData) => {
  const response: AxiosResponse<employee> = await axios.post(
    URL + `/hr/intern`,
    data,
    { headers: { ...headers } }
  );
  return response.data;
};

export const getAllTasksByIntern = async (internId: number) => {
  const response: AxiosResponse<taskToIntern[]> = await axios.get(
    URL + `/hr/tasks/${internId}`,
    { headers: { ...headers } }
  );
  return response.data;
};

export const addEmployee = async (data: employeeData) => {
  const response: AxiosResponse<task[]> = await axios.post(
    URL + `/hr/employee`,
    data,
    { headers: { ...headers } }
  );
  return response.data;
};

// TODO доделать
// export const getAllInterns = async () => {
//   const response: AxiosResponse<employee[]> = await axios.get(
//     URL + `/hr/interns`
//   );
//   return response;
// };
