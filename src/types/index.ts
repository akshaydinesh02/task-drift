// import { Dispatch, SetStateAction } from "react";
import { ReactNode } from "react";
import { Styles } from "react-modal";
import { z } from "zod";
import { containerSchema } from "../validation/containerSchema";
import { taskSchema } from "../validation/taskSchema";

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

export interface ITaskForm extends IModalFormProps {
  currentEditingTask?: ICurrentEditingTask | null;
  newTaskContainerId?: string | null;
}

export type ContainerFormData = z.infer<typeof containerSchema>;
export type TaskFormData = z.infer<typeof taskSchema>;
