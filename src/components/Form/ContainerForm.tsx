import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { containerSchema } from "../../validation/containerSchema";
import { ContainerFormData } from "../../types";
import { useData } from "../../contexts/Data";

const ContainerForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<ContainerFormData>({
    resolver: zodResolver(containerSchema),
  });

  const { addContainer } = useData();

  return (
    <form onSubmit={handleSubmit((data) => addContainer(data, setError))}>
      <div className="flex flex-col justify-center gap-2 mb-4">
        <h1 className="text-center text-3xl font-medium mb-4">Add Container</h1>
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
        className="flex items-center font-bold justify-center w-full border p-2 rounded-md bg-blue-300"
        type="submit"
      >
        Add
      </button>
    </form>
  );
};

export default ContainerForm;
