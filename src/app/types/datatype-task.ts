export type TaskDataScheme = {
  id: string;
  title: string;
  description: string;
  userId: string;
  subtask: {
    id: string;
    title: string;
    description: string;
    taskId: string;
  }[];
  list: {
    id: string;
    name: string;
    color: string;
    taskId: string;
  }[];
  tags: {
    id: string;
    name: string;
    color: string;
    taskId: string;
  }[];
};

export type TaskDataDetail = {
  id: string;
  title: string;
  description: string;
  userId: string;
  subtask: {
    id: string;
    title: string;
    description: string;
    taskId: string;
  }[];
  list: {
    id: string;
    name: string;
    color: string;
    taskId: string;
  }[];
  tags: {
    id: string;
    name: string;
    color: string;
    taskId: string;
  }[];
};
