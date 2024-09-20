import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";

interface Task {
  name: string;
  status: string;
  description: string;
}

const initTasks = [{ name: "", status: "", description: "" }];

const TasksContext = createContext<{
  allTasks: Task[];
  setAllTasks: Dispatch<SetStateAction<Task[]>>;
}>({ allTasks: initTasks, setAllTasks: () => null });

const TasksProvider = ({ children }: { children: ReactNode }) => {
  const [allTasks, setAllTasks] = useState(initTasks);
  const value = {
    allTasks,
    setAllTasks,
  };

  return (
    <TasksContext.Provider value={value}>{children}</TasksContext.Provider>
  );
};

export const useTasks = () => {
  return useContext(TasksContext);
};

export default TasksProvider;
