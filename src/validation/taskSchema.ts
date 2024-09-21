import { z } from "zod";
import { TaskPriority } from "../types";

export const taskSchema = z.object({
  name: z
    .string()
    .max(30, "Task name should not exceed 30 characters")
    .min(1, "Task name is required"),
  priority: z.enum([TaskPriority.Low, TaskPriority.Medium, TaskPriority.High], {
    required_error: "Priority is mandatory",
    message: "Please select an option. (Low, Medium, High)",
  }),
  // status: z.enum([TaskStatus.Complete, TaskStatus.InComplete], {
  //   required_error: "Status is mandatory",
  // }),
  description: z
    .string()
    .max(100, "Description should not exceed 100 characters")
    .optional(),
});
