export type ListScheme = {
  id: string;
  name: string;
  color: string;
  userId: string;
};

export type ListWithTask = {
  taskId: string;
  listId: string;
  task: {
    title: string;
    description: string;
  };
};
