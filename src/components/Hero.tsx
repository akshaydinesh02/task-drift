import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();
  return (
    <section className="w-full bg-gray-200">
      <div className="flex flex-col md:flex-row justify-between max-w-2xl lg:max-w-5xl mx-auto bg-gray-200">
        <div className="w-full text-center md:text-left md:w-[50%] lg:w-[40%] flex flex-col gap-8 items-center justify-center p-2 md:p-6">
          <h1 className="px-2 text-3xl lg:text-5xl font-bold tracking-wide text-pretty space-y-8">
            Manage every task with
            <span className="text-blue-800 font-extrabold">
              <br />
              Task Drift
            </span>{" "}
            for absolutely{" "}
            <span className="uppercase text-rose-500 underline underline-offset-8">
              free!
            </span>
          </h1>
        </div>
        <div className="w-full md:w-[50%] lg:w-[60%] flex flex-col gap-2 justify-center items-center p-6 md:p-12">
          <img src="./containers.png" />
          <button
            onClick={() => navigate("/auth/sign-up")}
            className="w-full py-2 px-4 rounded-md bg-blue-500 hover:bg-blue-400"
          >
            <p className="font-bold text-white text-lg">Join Now</p>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
