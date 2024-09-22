import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TaskFormData, TaskPriority } from "../../types";
import { taskSchema } from "../../validation/taskSchema";
import { useData } from "../../contexts/Data";

const initData = {
  name: "",
  description: "",
  priority: TaskPriority.Low,
};

const TaskForm = () => {
  const { addTask, currentData } = useData();
  const existingTask = Object.values(currentData)[0] || false;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TaskFormData>({
    resolver: zodResolver(taskSchema),
    defaultValues: existingTask
      ? {
          name: existingTask.name,
          description: existingTask.description,
          priority: existingTask.priority,
        }
      : initData,
  });

  return (
    <form onSubmit={handleSubmit(addTask)}>
      <div className="flex flex-col justify-center gap-2 mb-4">
        <h1 className="text-center text-3xl font-extrabold">
          {existingTask ? "Edit Task" : "Add Task"}
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
        {existingTask ? "Save" : "Add"}
      </button>
    </form>
  );
};

export default TaskForm;
