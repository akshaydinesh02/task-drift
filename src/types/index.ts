// import { Dispatch, SetStateAction } from "react";
import { ReactNode } from "react";
import { Styles } from "react-modal";
import { z } from "zod";
import { containerSchema } from "../validation/containerSchema";

export enum TaskPriority {
  Low = "low",
  Medium = "medium",
  High = "high",
}

export interface ITaskItem {
  id: string;
  name: string;
  priority: TaskPriority;
  status: string;
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

export type FormData = z.infer<typeof containerSchema>;
