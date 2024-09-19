interface IVerticalCardProps {
  name: string;
  tasks?: Array<{ name: string }>;
}

const VerticalCard = (props: IVerticalCardProps) => {
  const { name, tasks } = props;
  console.log(tasks);
  return (
    <section className="bg-gray-300 w-full">
      <h1 className="text-start py-2 px-6 font-extrabold text-gray-600 capitalize">
        {name}
      </h1>
      <div className="flex flex-col gap-4 w-[95%] mx-auto rounded-md">
        {tasks?.map((task, _i) => (
          <p key={_i} className="p-2 bg-white">
            {task.name}
          </p>
        ))}
      </div>
    </section>
  );
};

export default VerticalCard;
