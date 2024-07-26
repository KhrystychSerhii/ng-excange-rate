export type Task = {
  id: string;
  title: string;
  subTasks: Array<SubTask>;
};

export type SubTask = Omit<Task, 'subTasks'> & { completed: true; subTasks?: Array<SubTask>; };
