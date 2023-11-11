import { achievement, post } from '../admin/interfaces';
import { role } from '../auth/interfaces';
import { Article } from '../knowledge-base/interfaces';

export interface task {
  created: string;
  taskId: number;
  companyId: number;
  post: post;
  imagePath: string;
  name: string;
  description: string;
  levelDifficulty: number;
  rate: number;
}

export interface tasksToAdd {
  postName: string;
  imagePath: string;
  name: string;
  description: string;
  levelDifficulty: number;
  rate: number;
}

export interface addStage {
  name: string;
  levelDifficulty: number;
  deadline: string;
  tasksId: number[];
}

export interface stage {
  created: string;
  stageId: number;
  companyId: number;
  employeeId: number;
  name: string;
  levelDifficulty: number;
  testUrl: string;
  status: string;
  deadline: string;
  timeFinish: string;
}

export interface createInternData {
  name: string;
  email: string;
  postName: string;
  roleName: string;
  curatorEmail: string;
}

export interface employee {
  created: string;
  employeeId: number;
  imagePath: string;
  companyId: number;
  password: string;
  email: string;
  post: post;
  levelDifficulty: number;
  name: string;
  phone: string;
  socialNetwork: string;
  city: string;
  roles: role[];
  stages: stage[];
  favoriteArticles: Article[];
  achievements: achievement[];
  curatorId: number;
  account: number;
}

export interface allTaskAndStage {
  stage: stage;
  tasks: task[];
}

export interface taskStage {
  created: string;
  taskStageId: number;
  task: task;
  status: string;
  answerUrl: string;
  deadline: string;
  timeFinish: string;
}

export interface addTaskForUser {
  employeeId: number;
  employeeName: string;
  post: post;
  taskStageId: number;
  taskName: string;
}
