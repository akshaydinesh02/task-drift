import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginFormSchema, loginSchema } from "../../validation/authSchema";
import Input from "./Input";

interface LoginFormProps {
  onSubmit: (data: LoginFormSchema) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormSchema>({
    resolver: zodResolver(loginSchema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full">
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
    </form>
  );
};

export default LoginForm;
