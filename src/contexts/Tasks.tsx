import { createContext, ReactNode, useContext, useState } from "react";
import { ITaskContainer } from "../types";

const TasksContext = createContext<{
  containers: Map<string, ITaskContainer>;
}>({
  containers: new Map(),
});

const TasksProvider = ({ children }: { children: ReactNode }) => {
  const [containers] = useState<Map<string, ITaskContainer>>(new Map());

  const value = {
    containers,
  };

  return (
    <TasksContext.Provider value={value}>{children}</TasksContext.Provider>
  );
};

export const useTasks = () => {
  return useContext(TasksContext);
};

export default TasksProvider;
