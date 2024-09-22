import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  ContainerFormData,
  ITaskContainer,
  ITaskItem,
  TaskFormData,
  TaskPriority,
} from "../types";
import {
  fetchDataFromLocalStorage,
  saveToLocalStorage,
} from "../utils/localstorage";
import { useAuth } from "./Auth";
import { DropResult } from "@hello-pangea/dnd";
import { Dispatch, SetStateAction } from "react";
import { v4 as uuidv4 } from "uuid";
import { useToggleContext } from "./Toggle";
import { UseFormSetError } from "react-hook-form";

const DataContext = createContext<{
  containers: Map<string, ITaskContainer>;
  resetData: () => void;
  deleteTask: (taskId: string, containerId: string) => void;
  handleTaskDrag: (result: DropResult) => void;
  currentData: { [key: string]: ITaskItem | null };
  setCurrentData: Dispatch<SetStateAction<{ [key: string]: ITaskItem | null }>>;
  addTask: (data: TaskFormData) => void;
  addContainer: (
    data: ContainerFormData,
    setError: UseFormSetError<ContainerFormData>
  ) => void;
  onRequestTaskModalClose: () => void;
  onRequestContainerModalClose: () => void;
}>({
  containers: new Map(),
  resetData: () => {},
  deleteTask: () => {},
  handleTaskDrag: () => {},
  currentData: {},
  setCurrentData: () => {},
  addTask: () => {},
  addContainer: () => {},
  onRequestTaskModalClose: () => {},
  onRequestContainerModalClose: () => {},
});

const TasksProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const { setTaskModalOpen, setContainerModalOpen } = useToggleContext();

  const [containers, setContainers] = useState<Map<string, ITaskContainer>>(
    new Map()
  );
  const [currentData, setCurrentData] = useState<{
    [key: string]: ITaskItem | null;
  }>({ "": null });

  // Containers
  const addContainer = (
    data: ContainerFormData,
    setError: UseFormSetError<ContainerFormData>
  ) => {
    try {
      // Only allow 6 containers at max
      console.log(containers.size);
      if (containers.size >= 6) {
        setError("containerName", {
          type: "manual",
          message: "You can only create upto 6 containers",
        });
        return;
      }
      // Check for duplicate container name
      const isDuplicate = Array.from(containers.values()).some(
        (container) => container?.title === data.containerName
      );

      if (isDuplicate) {
        setError("containerName", {
          type: "manual",
          message: "Container name already exists",
        });
        return;
      }

      // Create new container (default task)
      const newContainerId = uuidv4();
      const newTaskId = uuidv4();
      containers.set(newContainerId, {
        id: newContainerId,
        title: data.containerName,
        tasks: [
          {
            id: newTaskId,
            name: "Click here to edit",
            description: "Write task description here.",
            priority: TaskPriority.High,
          },
        ],
      });

      // Write to local storage
      saveToLocalStorage(containers, user?.id || "");
      // Close modal
      onRequestContainerModalClose();
    } catch (error: unknown) {
      console.log("Error while adding container", error);
    }
  };
  const resetData = useCallback(() => {
    console.log(containers);
    // Clear and create new map
    containers.clear();
    setContainers(new Map());
    // Remove from local storage
    localStorage.removeItem(`containers-${user?.id}`);
  }, [containers, user?.id]);

  // Tasks
  const deleteTask = (taskId: string, containerId: string) => {
    // Get container
    const container = containers.get(containerId);
    // Container | tasks undefined guard clause
    if (!container || !container.tasks) return;
    // Get task
    const taskIndex = container.tasks.findIndex((task) => task.id === taskId); // O(n)
    // Task undefined guard clause
    if (taskIndex === -1) return;
    // Remove task
    container.tasks.splice(taskIndex, 1);
    // Update Map
    containers.set(containerId, container);

    // Write to local storage
    saveToLocalStorage(containers, user?.id || "");
  };

  const addTask = useCallback(
    (data: TaskFormData) => {
      try {
        const { name, description, priority } = data;

        const containerId = Object.keys(currentData)[0];
        const container = containers.get(containerId);
        const existingTask = Object.values(currentData)[0];

        if (!container) {
          console.error("Container not found");
          return;
        }

        // Update old/add new task
        const newTask: ITaskItem = {
          id: existingTask ? existingTask.id : uuidv4(),
          name,
          description: description || "",
          priority,
        };

        if (existingTask) {
          const taskIndex = container.tasks?.findIndex(
            (task) => task.id === existingTask.id
          );

          if (taskIndex !== undefined && taskIndex >= 0) {
            container.tasks![taskIndex] = newTask;
          }
        } else {
          // Add New task
          console.log("Else block", data);

          // Add new task
          container.tasks = container.tasks
            ? [...container.tasks, newTask]
            : [newTask];
        }

        // Write to local storage
        saveToLocalStorage(containers, user?.id || "");
        // Close modal
        onRequestTaskModalClose();
      } catch (error: unknown) {
        console.error("Error while adding/updating task", error);
      }
    },
    [containers, currentData, user?.id]
  );

  const onRequestTaskModalClose = useCallback(() => {
    setTaskModalOpen(false);
    setCurrentData({ "": null });
  }, []);

  const onRequestContainerModalClose = useCallback(() => {
    setContainerModalOpen(false);
    setCurrentData({ "": null });
  }, []);

  const handleTaskDrag = (result: DropResult) => {
    const { source, destination } = result;
    if (
      !destination ||
      (source.droppableId === destination.droppableId &&
        source.index === destination.index)
    )
      return;

    const sourceContainerId = source.droppableId;
    const sourceIndex = source.index;
    const destinationContainerId = destination.droppableId;
    const destinationIndex = destination.index;

    // Fetch the source container and task
    const sourceContainer = containers.get(sourceContainerId);
    const task = sourceContainer?.tasks?.[sourceIndex];
    if (!task) {
      console.error("Task not found!");
      return;
    }

    // Fetch the destination container
    const destinationContainer = containers.get(destinationContainerId);
    if (!destinationContainer) {
      console.error("Destination container not found!");
      return;
    }

    // Move the task to the destination container
    destinationContainer.tasks?.splice(destinationIndex, 0, task);

    // Remove the task from the source container
    sourceContainer.tasks?.splice(sourceIndex, 1);

    // Update containers with the modified data
    containers.set(sourceContainerId, sourceContainer);
    containers.set(destinationContainerId, destinationContainer);

    // Write to local storage
    saveToLocalStorage(containers, user?.id || "");
  };

  useEffect(() => {
    const localContainers: Map<string, ITaskContainer> | null | undefined =
      fetchDataFromLocalStorage(user?.id || "");
    if (localContainers) {
      setContainers(localContainers);
    }
  }, [user?.id]);

  const value = {
    containers,
    resetData,
    deleteTask,
    handleTaskDrag,
    currentData,
    setCurrentData,
    addTask,
    addContainer,
    onRequestTaskModalClose,
    onRequestContainerModalClose,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export const useData = () => {
  return useContext(DataContext);
};

export default TasksProvider;
