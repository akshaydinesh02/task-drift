import { priorityColors } from "../../constants/colors";

interface IVerticalCardProps {
  name: string;
  tasks?: Array<{
    name: string;
    status: string;
    description: string;
    priority: string;
  }>;
}

const VerticalCard = (props: IVerticalCardProps) => {
  const { name, tasks } = props;
  return (
    <section className="bg-gray-300 w-full rounded-md h-[90%] overflow-y-scroll">
      <div className="flex items-center justify-between w-full sticky top-0 backdrop-blur-xl">
        <h1 className="text-start font-extrabold text-gray-600 capitalize px-4 py-2">
          {name}
        </h1>
        <button className="text-xl px-4 py-2">&#43;</button>
      </div>
      <div className="flex flex-col gap-4 w-[95%] mx-auto my-2">
        {tasks?.map((task, _i) => (
          <button
            key={_i}
            className="p-2 bg-white rounded-md flex justify-between items-center"
          >
            <p>{task.name}</p>
            <p
              className={`p-2 h-6 w-6 rounded-full ${priorityColors.get(
                task.priority
              )}`}
            >
              &nbsp;
            </p>
          </button>
        ))}
      </div>
    </section>
  );
};

export default VerticalCard;
