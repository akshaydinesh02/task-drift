import { Provider } from "@supabase/supabase-js";
import { auth } from "../../lib/supabase";
import LoginForm from "../../components/Form/LoginForm";
import { useNavigate } from "react-router-dom";
import { LoginFormSchema } from "../../validation/authSchema";
import Google from "../../logo/Google";

const LoginPage = () => {
  const BASE_URL = import.meta.env.BASE_URL || "";
  console.log(BASE_URL);
  const signInWithProvider = async (provider: Provider) => {
    const { error } = await auth.signInWithOAuth({
      provider: provider,
    });
    console.error(error);
    // Handle errors gracefully
  };

  const loginWithEmail = async (data: LoginFormSchema) => {
    const { error } = await auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });
    console.error(error);
    // Handle errors gracefully
  };
  const navigate = useNavigate();

  return (
    <main className="h-screen w-[90%] md:w-4/5 lg:w-3/5 mx-auto pt-12">
      <div className="flex flex-col items-center justify-center gap-4 mt-12 border p-6 md:p-12 rounded-md bg-gray-200 shadow-xl">
        <h1 className="text-3xl text-center w-full">Login</h1>
        <LoginForm onSubmit={loginWithEmail} />
        <p className="text-center w-full">
          Don't have an account?{" "}
          <button
            className="font-bold text-blue-500 text-center"
            onClick={() => navigate("/auth/sign-up")}
          >
            Sign up!
          </button>
        </p>

        <div className="relative py-4 w-full">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-b border-gray-300"></div>
          </div>
          <div className="relative flex justify-center">
            <span className="bg-white rounded-md px-4 text-sm text-gray-500 font-normal">
              OR
            </span>
          </div>
        </div>

        <button
          onClick={() => signInWithProvider("google")}
          className="border flex w-full justify-center items-center gap-4 border-gray-400 p-2 rounded-md w-full font-bold bg-white"
        >
          <Google />
          <p>Google</p>
        </button>
      </div>
    </main>
  );
};

export default LoginPage;
