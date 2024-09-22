import { Dispatch, ReactNode, SetStateAction } from "react";
import { Styles } from "react-modal";
import { z } from "zod";
import { containerSchema } from "../validation/containerSchema";
import { taskSchema } from "../validation/taskSchema";
import { DropResult } from "@hello-pangea/dnd";
import { UseFormSetError } from "react-hook-form";

export enum TaskPriority {
  Low = "low",
  Medium = "medium",
  High = "high",
}

export enum TaskStatus {
  Complete = "complete",
  InComplete = "incomplete",
}

export interface ITaskItem {
  id: string;
  name: string;
  priority: TaskPriority;
  // status: TaskStatus;
  description: string;
}

export interface ITaskContainer {
  id: string;
  title: string;
  tasks: ITaskItem[] | null;
}

export interface IModalProps {
  isOpen: boolean;
  // setIsOpen: Dispatch<SetStateAction<boolean>>;
  contentLabel: string;
  onRequestClose: () => void;
  children: ReactNode;
  style?: Styles;
  onAfterOpen?: () => void;
}

export interface IContainer {
  string: ITaskContainer;
}

export interface ICurrentEditingTask {
  containerId: string;
  task: ITaskItem;
}

export interface IModalFormProps {
  isOpen?: boolean;
  onRequestClose?: () => void;
}

export interface IVerticalCardProps {
  name: string;
  containerId: string;
  tasks?: ITaskItem[] | null;
}

export type ContainerFormData = z.infer<typeof containerSchema>;
export type TaskFormData = z.infer<typeof taskSchema>;

export interface IToggleContext {
  containerEditModalOpen: boolean;
  setContainerEditModalOpen: Dispatch<SetStateAction<boolean>>;
  containerModalOpen: boolean;
  setContainerModalOpen: Dispatch<SetStateAction<boolean>>;
  taskModalOpen: boolean;
  setTaskModalOpen: Dispatch<SetStateAction<boolean>>;
  resetConfirmationModalOpen: boolean;
  setResetConfirmationModalOpen: Dispatch<SetStateAction<boolean>>;
  deleteTaskConfirmationModalOpen: boolean;
  setDeleteTaskConfirmationModalOpen: Dispatch<SetStateAction<boolean>>;
}

export interface IDataContext {
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
  deleteContainer: (id: string) => boolean;
  updateContainer: (
    id: string,
    newTitle: string,
    setError: UseFormSetError<ContainerFormData>
  ) => boolean;
  onRequestTaskModalClose: () => void;
  onRequestContainerModalClose: () => void;
  onRequestContainerEditModalClose: () => void;
  onRequestResetConfirmationModalClose: () => void;
  onRequestDeleteTaskConfirmationModalClose: () => void;
}

export interface IFeatureProps {
  id: string;
  header: string;
  description: string;
  image: string;
  isReversed: boolean;
}
