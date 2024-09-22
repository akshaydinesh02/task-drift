import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignUpFormSchema, signUpSchema } from "../../validation/authSchema";
import Input from "./Input";

interface SignUpFormProps {
  onSubmit: (data: SignUpFormSchema) => void;
}

const SignUpForm: React.FC<SignUpFormProps> = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormSchema>({
    resolver: zodResolver(signUpSchema),
  });

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
      <Input
        label="Confirm Password"
        type="password"
        register={register("confirmPassword")}
        error={errors.confirmPassword}
      />
      <button
        type="submit"
        className="bg-blue-500 text-white p-2 rounded-md w-full"
      >
        Sign Up
      </button>
    </form>
  );
};

export default SignUpForm;
