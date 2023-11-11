import axios, { AxiosResponse } from 'axios';
import { URL } from '..';
import { headers } from '../';
import { answerData, taskToIntern } from './interfaces';
export const setAnswerToTask = async (
  taskStageId: number,
  data: answerData
) => {
  const response: AxiosResponse<taskToIntern> = await axios.post(
    URL + `/intern/tasks/${taskStageId}/answer`,
    data,
    { headers: { ...headers } }
  );
  return response.data;
};
