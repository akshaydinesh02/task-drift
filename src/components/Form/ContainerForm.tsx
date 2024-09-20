import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { containerSchema } from "../../validation/containerSchema";
import { FormData, TaskPriority } from "../../types";
import { useTasks } from "../../contexts/Tasks";
import { v4 as uuidv4 } from "uuid";

const ContainerForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<FormData>({
    resolver: zodResolver(containerSchema),
  });

  const { containers } = useTasks();

  const onSubmit = (data: FormData) => {
    // Check if a container with the same name already exists
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

    const newId = uuidv4();
    containers.set(newId, {
      id: newId,
      title: data.containerName,
      tasks: [
        {
          id: "task-id-2",
          name: "Test-task",
          description: "Test desc",
          priority: TaskPriority.High,
          status: "incomplete",
        },
      ],
    });
    console.log("New containers", containers);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col justify-center gap-2 mb-4">
        {/* <label className="font-bold" htmlFor="containerName">
          Container Name
        </label> */}
        <input
          id="containerName"
          {...register("containerName")}
          placeholder="Enter container name"
          className="border p-1"
        />
        {errors.containerName && (
          <p style={{ color: "red" }}>{errors.containerName.message}</p>
        )}
      </div>

      <button
        className="flex items-center justify-center w-full border p-2 rounded-md bg-blue-300"
        type="submit"
      >
        Submit
      </button>
    </form>
  );
};

export default ContainerForm;
