const Hero = () => {
  return (
    <section className="w-full bg-gray-200">
      <div className="flex justify-between max-w-5xl mx-auto bg-gray-200">
        <div className="w-[40%] flex flex-col gap-16 items-center justify-center p-6">
          <h1 className="px-2 text-5xl font-bold tracking-wide text-pretty space-y-8">
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
          <button className="w-full py-2 px-4 rounded-md bg-blue-500 hover:bg-blue-400">
            <p className="font-bold text-white text-lg">Join Now</p>
          </button>
        </div>
        <div className="w-[60%]">
          Manage every task, together with Task Drift
        </div>
      </div>
    </section>
  );
};

export default Hero;
