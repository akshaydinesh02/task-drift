import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { containerSchema } from "../../validation/containerSchema";
import {
  ContainerEditFormData,
  IModalFormProps,
  TaskPriority,
} from "../../types";
import { useTasks } from "../../contexts/Tasks";
import { v4 as uuidv4 } from "uuid";

const ContainerEditForm = (props: IModalFormProps) => {
  const { onRequestClose } = props;
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<ContainerEditFormData>({
    resolver: zodResolver(containerSchema),
  });

  const { containers } = useTasks();

  const handleAddContainer = (data: ContainerEditFormData) => {
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

      // New container
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

      if (onRequestClose) onRequestClose();
    } catch (error: unknown) {
      console.log("Error while adding container", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleAddContainer)}>
      <div className="flex flex-col justify-center gap-2 mb-4">
        <label className="font-bold" htmlFor="containerName">
          Container Name
        </label>
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

export default ContainerEditForm;
