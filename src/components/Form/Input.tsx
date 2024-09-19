import { FC } from "react";
import { FieldError, UseFormRegister } from "react-hook-form";

interface InputProps {
  label: string;
  type?: string;
  error?: FieldError;
  register: ReturnType<
    UseFormRegister<{
      email: string;
      password: string;
      confirmPassword?: string;
    }>
  >;
}

const Input: FC<InputProps> = ({ label, type = "text", error, register }) => (
  <div className="mb-4 w-full">
    <label className="block text-gray-700">{label}</label>
    <input
      type={type}
      {...register}
      className={`mt-1 p-2 block w-full border ${
        error ? "border-red-500" : "border-gray-300"
      } rounded-md`}
    />
    {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
  </div>
);

export default Input;
