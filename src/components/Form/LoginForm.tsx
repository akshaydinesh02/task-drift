import {
  FieldErrors,
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormSetError,
} from "react-hook-form";
import { LoginFormSchema } from "../../validation/authSchema";
import Input from "./Input";

interface LoginFormProps {
  onSubmit: (data: LoginFormSchema) => void;
  register: UseFormRegister<LoginFormSchema>;
  handleSubmit: UseFormHandleSubmit<LoginFormSchema>;
  errors: FieldErrors<LoginFormSchema>;
  setError: UseFormSetError<LoginFormSchema>;
}

const LoginForm: React.FC<LoginFormProps> = ({
  onSubmit,
  register,
  handleSubmit,
  errors,
}) => {
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full font-bold">
      <Input
        label="Email"
        type="email"
        register={register("email")}
        error={errors.email}
      />
      <Input
        label="Password"
        type="password"
        register={register("password")}
        error={errors.password}
      />
      <button
        type="submit"
        className="bg-blue-500 text-white p-2 rounded-md w-full"
      >
        Login
      </button>
      <p className="mt-2 text-red-500">{errors.root?.message}</p>
    </form>
  );
};

export default LoginForm;
