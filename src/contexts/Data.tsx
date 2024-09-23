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
  IDataContext,
  ITaskContainer,
  ITaskItem,
  TaskFormData,
} from "../types";
import {
  fetchDataFromLocalStorage,
  saveToLocalStorage,
} from "../utils/localstorage";
import { useAuth } from "./Auth";
import { DropResult } from "@hello-pangea/dnd";
import { v4 as uuidv4 } from "uuid";
import { useToggleContext } from "./Toggle";
import { UseFormSetError } from "react-hook-form";

const DataContext = createContext<IDataContext>({
  containers: new Map(),
  resetData: () => {},
  deleteTask: () => {},
  handleTaskDrag: () => {},
  currentData: {},
  setCurrentData: () => {},
  addTask: () => {},
  addContainer: () => {},
  deleteContainer: () => false,
  updateContainer: () => false,
  onRequestTaskModalClose: () => {},
  onRequestContainerModalClose: () => {},
  onRequestContainerEditModalClose: () => {},
  onRequestResetConfirmationModalClose: () => {},
  onRequestDeleteTaskConfirmationModalClose: () => {},
});

const TasksProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const {
    setTaskModalOpen,
    setContainerModalOpen,
    setContainerEditModalOpen,
    setResetConfirmationModalOpen,
    setDeleteTaskConfirmationModalOpen,
  } = useToggleContext();

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
      if (containers.size >= 6) {
        setError("containerName", {
          type: "manual",
          message: "You can only create upto 6 containers",
        });
        throw new Error("Container name more than 6 characters.");
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
        throw new Error("Duplicate container name");
      }

      // Create new container (default task)
      const newContainerId = uuidv4();
      containers.set(newContainerId, {
        id: newContainerId,
        title: data.containerName,
        tasks: [],
      });

      // Write to local storage
      saveToLocalStorage(containers, user?.id || "");
      // Close modal
      onRequestContainerModalClose();
    } catch (error: unknown) {
      console.error("Error while adding container", error);
    }
  };

  const deleteContainer = (id: string) => {
    try {
      if (containers.has(id)) {
        containers.delete(id);
        saveToLocalStorage(containers, user?.id || "");
        onRequestContainerEditModalClose();
        return true;
      }
      onRequestContainerEditModalClose();
      throw new Error("Container not found");
    } catch (error: unknown) {
      console.error("Error while deleting container", error);
      return false;
    }
  };

  const resetData = useCallback(() => {
    try {
      // Clear and create new map
      containers.clear();
      setContainers(new Map());
      // Remove from local storage
      localStorage.removeItem(`containers-${user?.id}`);
      onRequestResetConfirmationModalClose();
    } catch (error: unknown) {
      console.error("Error while resetting data", error);
    }
  }, [containers, user?.id]);

  const updateContainer = (
    id: string,
    newTitle: string,
    setError: UseFormSetError<ContainerFormData>
  ) => {
    try {
      // Check for duplicate container name
      const isDuplicate = Array.from(containers.values()).some(
        (container) => container?.title === newTitle
      );
      if (isDuplicate) {
        setError("containerName", {
          type: "manual",
          message: "Container name already exists",
        });
        throw new Error("Duplicate container name");
      }
      const container = containers.get(id);
      if (!container) throw new Error("Container not found");
      container.title = newTitle;
      saveToLocalStorage(containers, user?.id || "");
      onRequestContainerEditModalClose();
      return true;
    } catch (error: unknown) {
      console.error("Error while updating container", error);
      return false;
    }
  };

  // Tasks
  const deleteTask = (taskId: string, containerId: string) => {
    try {
      // Get container
      const newContainers = new Map(containers);
      const container = newContainers.get(containerId);
      // Container | tasks undefined guard clause
      if (!container || !container.tasks)
        throw new Error("Container or tasks array not found");
      // Get task
      const taskIndex = container.tasks.findIndex((task) => task.id === taskId); // O(n)
      // Task undefined guard clause
      if (taskIndex === -1) throw new Error("Task array not found");
      // Remove task
      container.tasks.splice(taskIndex, 1);
      // Update Map
      setContainers(newContainers);

      // Write to local storage
      saveToLocalStorage(containers, user?.id || "");

      // Close modal
      onRequestDeleteTaskConfirmationModalClose();
    } catch (error: unknown) {
      console.error("Error while deleting task", error);
    }
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

  const handleTaskDrag = (result: DropResult) => {
    try {
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
        throw new Error("Task not found!");
      }

      // Fetch the destination container
      const destinationContainer = containers.get(destinationContainerId);
      if (!destinationContainer) {
        throw new Error("Destination container not found!");
      }

      // Same container drag and drop
      if (sourceContainerId === destinationContainerId) {
        // Remove task from org position
        const tasks = sourceContainer.tasks || [];
        tasks.splice(sourceIndex, 1);

        // Insert at new pos
        tasks.splice(destinationIndex, 0, task);
        sourceContainer.tasks = tasks;
        containers.set(sourceContainerId, sourceContainer);
      } else {
        // Different container drag and drop
        // Move the task to the destination container
        destinationContainer.tasks?.splice(destinationIndex, 0, task);

        // Remove the task from the source container
        sourceContainer.tasks?.splice(sourceIndex, 1);

        // Update containers with the modified data
        containers.set(sourceContainerId, sourceContainer);
        containers.set(destinationContainerId, destinationContainer);
      }

      // Write to local storage
      saveToLocalStorage(containers, user?.id || "");
    } catch (error: unknown) {
      console.error("Error in handleTaskDrag", error);
    }
  };

  // Modal
  const onRequestTaskModalClose = useCallback(() => {
    setTaskModalOpen(false);
    setCurrentData({ "": null });
  }, []);

  const onRequestContainerModalClose = useCallback(() => {
    setContainerModalOpen(false);
    setCurrentData({ "": null });
  }, []);

  const onRequestContainerEditModalClose = useCallback(() => {
    setContainerEditModalOpen(false);
    setCurrentData({ "": null });
  }, []);

  const onRequestResetConfirmationModalClose = useCallback(() => {
    setResetConfirmationModalOpen(false);
    setCurrentData({ "": null });
  }, []);

  const onRequestDeleteTaskConfirmationModalClose = useCallback(() => {
    setDeleteTaskConfirmationModalOpen(false);
    setCurrentData({ "": null });
  }, []);

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
    deleteContainer,
    updateContainer,
    onRequestTaskModalClose,
    onRequestContainerModalClose,
    onRequestContainerEditModalClose,
    onRequestResetConfirmationModalClose,
    onRequestDeleteTaskConfirmationModalClose,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export const useData = () => {
  return useContext(DataContext);
};

export default TasksProvider;
