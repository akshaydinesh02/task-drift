import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ITaskForm, ITaskItem, TaskFormData, TaskPriority } from "../../types";
import { taskSchema } from "../../validation/taskSchema";
import { useCallback } from "react";
import { useTasks } from "../../contexts/Tasks";
import { v4 as uuidv4 } from "uuid";

const initData = {
  name: "",
  description: "",
  priority: TaskPriority.Low,
};

const TaskForm = (props: ITaskForm) => {
  const { currentEditingTask, onRequestClose, newTaskContainerId } = props;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TaskFormData>({
    resolver: zodResolver(taskSchema),
    defaultValues: currentEditingTask
      ? {
          name: currentEditingTask.task.name,
          description: currentEditingTask.task.description,
          priority: currentEditingTask.task.priority,
        }
      : initData,
  });

  const { containers } = useTasks();

  const handleAddTask = useCallback(
    (data: TaskFormData) => {
      try {
        const { name, description, priority } = data;

        const containerId = currentEditingTask
          ? currentEditingTask.containerId
          : newTaskContainerId;
        const container = containers.get(containerId!);

        if (!container) {
          console.error("Container not found");
          return;
        }

        // Update old/add new task
        const newTask: ITaskItem = {
          id: currentEditingTask ? currentEditingTask.task.id : uuidv4(),
          name,
          description: description || "",
          priority,
        };

        if (currentEditingTask) {
          const taskIndex = container.tasks?.findIndex(
            (task) => task.id === currentEditingTask.task.id
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

        // Close modal
        if (onRequestClose) onRequestClose();
      } catch (error: unknown) {
        console.error("Error while adding/updating task", error);
      }
    },
    [currentEditingTask, onRequestClose, containers, newTaskContainerId]
  );

  return (
    <form onSubmit={handleSubmit(handleAddTask)}>
      <div className="flex flex-col justify-center gap-2 mb-4">
        <h1 className="text-center text-3xl font-extrabold">
          {currentEditingTask ? "Edit Task" : "Add Task"}
        </h1>
        <label className="font-bold" htmlFor="name">
          Task Name
        </label>
        <input
          id="name"
          {...register("name")}
          placeholder="Enter task name"
          className="border p-1"
        />
        {errors.name && <p style={{ color: "red" }}>{errors.name.message}</p>}
      </div>
      <div className="flex flex-col justify-center gap-2 mb-4">
        <label className="font-bold" htmlFor="description">
          Task Description
        </label>
        <input
          id="description"
          {...register("description")}
          placeholder="Enter task description"
          className="border p-1"
        />
        {errors.name && (
          <p style={{ color: "red" }}>{errors.description?.message}</p>
        )}
      </div>
      <div className="flex flex-col justify-center gap-2 mb-4">
        <label className="font-bold" htmlFor="priority">
          Priority
        </label>
        <select id="priority" {...register("priority")} className="border p-1">
          <option value="">Select task priority</option>
          <option value={TaskPriority.Low}>Low</option>
          <option value={TaskPriority.Medium}>Medium</option>
          <option value={TaskPriority.High}>High</option>
        </select>
        {errors.name && (
          <p style={{ color: "red" }}>{errors.priority?.message}</p>
        )}
      </div>
      <button
        className="flex items-center justify-center w-full border p-2 rounded-md bg-blue-300"
        type="submit"
      >
        {currentEditingTask ? "Save" : "Add"}
      </button>
    </form>
  );
};

export default TaskForm;
