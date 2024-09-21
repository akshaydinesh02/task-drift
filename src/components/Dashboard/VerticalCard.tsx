import { priorityColors } from "../../constants/colors";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { ITaskItem } from "../../types";

interface IVerticalCardProps {
  name: string;
  openAddTaskModal: (containerId: string, task?: ITaskItem) => void;
  containerId: string;
  tasks?: ITaskItem[] | null;
}

const VerticalCard = (props: IVerticalCardProps) => {
  const { name, tasks, openAddTaskModal, containerId } = props;
  return (
    <section className="bg-gray-300 w-full rounded-md h-[90%] overflow-y-scroll pb-8">
      <div className="flex items-center justify-between w-full sticky top-0 backdrop-blur-xl">
        <h1 className="text-start font-extrabold text-gray-600 capitalize px-4 py-2">
          {name}
        </h1>
        <button
          onClick={() => openAddTaskModal(containerId)}
          className="text-xl px-4 py-2"
        >
          &#43;
        </button>
      </div>
      <Droppable droppableId={name} type="group">
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="flex flex-col gap-4 w-[95%] mx-auto my-2"
          >
            {tasks?.map((task, _i) => (
              <Draggable draggableId={task.id} key={task.id} index={_i}>
                {(provided) => (
                  <div
                    onClick={() => openAddTaskModal(containerId, task)}
                    {...provided.dragHandleProps}
                    {...provided.draggableProps}
                    ref={provided.innerRef}
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
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </section>
  );
};

export default VerticalCard;
