import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { containerSchema } from "../../validation/containerSchema";
import { ContainerFormData } from "../../types";
import { useData } from "../../contexts/Data";

const ContainerEditForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<ContainerFormData>({
    resolver: zodResolver(containerSchema),
  });

  const { updateContainer, currentData } = useData();

  return (
    <form
      onSubmit={handleSubmit((data) =>
        updateContainer(
          Object.keys(currentData)[0] as string,
          data.containerName,
          setError
        )
      )}
    >
      <div className="flex flex-col justify-center gap-2 mb-4">
        <h1 className="text-center text-3xl font-extrabold mb-4">
          Edit Container
        </h1>
        <label className="font-bold" htmlFor="containerName">
          New Container Name
        </label>
        <input
          id="containerName"
          {...register("containerName")}
          placeholder="Enter new container name"
          className="border p-1"
        />
        {errors.containerName && (
          <p style={{ color: "red" }}>{errors.containerName.message}</p>
        )}
      </div>

      <div className="flex flex-col gap-4">
        <button
          className="flex items-center justify-center w-full border p-2 rounded-md bg-blue-300"
          type="submit"
        >
          Update
        </button>
        <div>
          <button
            className="flex items-center justify-center w-full border p-2 rounded-md bg-red-600"
            type="submit"
          >
            Delete
          </button>
          <p className="text-center text-sm italic">
            Warning: This will delete the container!
          </p>
        </div>
      </div>
    </form>
  );
};

export default ContainerEditForm;
