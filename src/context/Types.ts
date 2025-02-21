import type { Dispatch, SetStateAction } from 'react';
import type { ITask } from '../components/Todo/Types';

export interface TaskContextData {
  taskList: ITask[];
  setTaskList: Dispatch<SetStateAction<ITask[]>>;
  addTask: (task: string) => void;
  updateTask: (updatedTask: ITask) => void;
  deleteTask: (taskId: number) => void;
  toggleTaskCompletion: (taskId: number) => void;
  reopenTask: (id: number) => void;
}
