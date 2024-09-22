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

  const {
    updateContainer,
    currentData,
    onRequestContainerEditModalClose,
    deleteContainer,
  } = useData();

  return (
    <div className="flex flex-col gap-4">
      <form
        className="border-b pb-6"
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
        </div>
      </form>
      <div>
        <h1 className="text-center text-3xl font-extrabold mb-4">
          Delete Container
        </h1>
        <div className="flex gap-4">
          <button
            onClick={onRequestContainerEditModalClose}
            className="flex items-center justify-center w-full border p-2 rounded-md bg-gray-300"
            type="submit"
          >
            No
          </button>
          <button
            onClick={() => {
              deleteContainer(Object.keys(currentData)[0]);
            }}
            className="flex items-center justify-center w-full border p-2 rounded-md bg-red-600"
            type="submit"
          >
            Yes
          </button>
        </div>
        <p className="text-center text-sm italic text-red-700 font-bold">
          Warning: This will delete the container!
        </p>
      </div>
    </div>
  );
};

export default ContainerEditForm;
