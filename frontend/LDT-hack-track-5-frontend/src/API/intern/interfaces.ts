import { stage, task } from '../hr/interfaces';

export interface answerData {
  answerUrl: string;
}

export interface taskToIntern {
  created: string;
  taskStageId: number;
  stage: stage;
  task: task;
  status: string;
  answerUrl: string;
  deadline: string;
  timeFinish: string;
}
