import { auth } from "../../lib/supabase";
import { useNavigate } from "react-router-dom";
import SignUpForm from "../../components/Form/SignUpForm";
import { SignUpFormSchema } from "../../validation/authSchema";

const SignUpPage = () => {
  const signUpWithEmail = async (data: SignUpFormSchema) => {
    const { error } = await auth.signUp({
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
        <h1 className="text-3xl text-center w-full">Sign Up</h1>
        <SignUpForm onSubmit={signUpWithEmail} />
        <p className="text-center w-full">
          Already have an account?{" "}
          <button
            className="font-bold text-blue-500 text-center"
            onClick={() => navigate("/auth/sign-in")}
          >
            Login here!
          </button>
        </p>
      </div>
    </main>
  );
};

export default SignUpPage;
