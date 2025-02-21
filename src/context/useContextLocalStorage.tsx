import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';
import { toast } from 'react-toastify';
import { toastConfig } from '../utils/toast';
import type { TaskContextData, ITask } from '../Types';

export const TaskContext = createContext<TaskContextData | undefined>(
  undefined
);

export function TaskProvider({ children }: { children: ReactNode }) {
  const [taskList, setTaskList] = useState<ITask[]>(() => {
    const storedTasks = localStorage.getItem('tarefas');
    return storedTasks ? JSON.parse(storedTasks) : [];
  });

  useEffect(() => {
    localStorage.setItem('tarefas', JSON.stringify(taskList));
  }, [taskList]);

  function addTask(task: string) {
    const newTask: ITask = {
      id: Math.floor(Math.random() * 999),
      task,
      completed: false,
    };
    setTaskList((prev) => [...prev, newTask]);
  }

  function updateTask(updatedTask: ITask) {
    setTaskList((prev) =>
      prev.map((t) => (t.id === updatedTask.id ? updatedTask : t))
    );
  }

  function deleteTask(taskId: number) {
    setTaskList((prev) => prev.filter((t) => t.id !== taskId));
  }

  function toggleTaskCompletion(taskId: number) {
    setTaskList((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, completed: !t.completed } : t))
    );
    toast.success('Tarefa finalizada!', {
      ...toastConfig,
    });
  }

  function reopenTask(id: number) {
    setTaskList((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: false } : task
      )
    );
    toast.warning('Tarefa reaberta', {
      ...toastConfig,
    });
  }

  return (
    <TaskContext.Provider
      value={{
        taskList,
        setTaskList,
        addTask,
        updateTask,
        deleteTask,
        toggleTaskCompletion,
        reopenTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useTask() {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTaskContext deve ser usado dentro de um TaskProvider');
  }
  return context;
}
