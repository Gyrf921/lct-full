import axios, { AxiosResponse } from 'axios';
import { headers, URL } from '../index.ts';
import { addStage, task, tasksToAdd } from '../hr/interfaces.ts';

import { allTaskAndStage } from '../hr/interfaces.ts';
import { departmentAnalytitcs } from './interfaces.ts';

export const getInternTasks = async (id) => {
  const response: AxiosResponse<allTaskAndStage[]> = await axios.get(
    URL + `/interns/${id}/tasks`,
    { headers: { ...headers } }
  );
  return response.data;
};

export const addStageToIntern = async (data: addStage, id: number) => {
  const response: AxiosResponse<addStage> = await axios.post(
    URL + `/curator/interns/${id}/stage`,
    data,
    { headers: { ...headers } }
  );
  return response.data;
};

export const addTaskToList = async (data: tasksToAdd) => {
  const response: AxiosResponse<tasksToAdd> = await axios.post(
    URL + `/curator/task`,
    data,
    { headers: { ...headers } }
  );
  return response.data;
};

export const getTasksInner = async (id: number) => {
  const response: AxiosResponse<task[]> = await axios.get(
    URL + `/interns/${id}/tasks`,
    { headers: { ...headers } }
  );
  return response.data;
};

export const getAllTasks = async () => {
  const response: AxiosResponse<task[]> = await axios.get(
    URL + `/curator/tasks`,
    { headers: { ...headers } }
  );
  return response.data;
};

export const updateTaskToList = async (data: tasksToAdd, id: number) => {
  const response: AxiosResponse<tasksToAdd> = await axios.put(
    URL + `/curator/tasks/${id}`,
    data,
    { headers: { ...headers } }
  );
  return response.data;
};

export const getAnalyticByDepartment = async (departmentName: string) => {
  const response: AxiosResponse<departmentAnalytitcs[]> = await axios.get(
    URL + `/curator/analytic?departmentName=${departmentName}`,
    { headers: { ...headers } }
  );
  return response.data;
};

export const addTaskToStage = async (
  data: tasksToAdd,
  stageId: number,
  taskId: number
) => {
  const response: AxiosResponse<tasksToAdd> = await axios.post(
    URL + `/curator/stage/${stageId}/tasks/${taskId}`,
    data,
    { headers: { ...headers } }
  );
  return response.data;
};
