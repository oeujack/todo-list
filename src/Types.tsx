import type { Dispatch, SetStateAction } from 'react';

export interface ITask {
  id: number;
  task: string;
  completed?: boolean;
}

export interface TaskContextData {
  taskList: ITask[];
  setTaskList: Dispatch<SetStateAction<ITask[]>>;
  addTask: (task: string) => void;
  updateTask: (updatedTask: ITask) => void;
  deleteTask: (taskId: number) => void;
  toggleTaskCompletion: (taskId: number) => void;
  reopenTask: (id: number) => void;
}
