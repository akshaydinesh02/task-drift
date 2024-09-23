import { priorityColors } from "../../constants/colors";
import { Draggable, Droppable } from "@hello-pangea/dnd";
import { useData } from "../../contexts/Data";
import { useToggleContext } from "../../contexts/Toggle";
import { ITaskItem, IVerticalCardProps } from "../../types";

const VerticalCard = (props: IVerticalCardProps) => {
  const { name, tasks, containerId } = props;
  const { setCurrentData } = useData();
  const {
    setTaskModalOpen,
    setContainerEditModalOpen,
    setDeleteTaskConfirmationModalOpen,
  } = useToggleContext();

  const onClickContainerEdit = () => {
    setContainerEditModalOpen(true);
    setCurrentData({ [containerId]: null });
  };
  const onTaskEdit = (task: ITaskItem) => {
    setCurrentData({ [containerId]: task });
    setTaskModalOpen(true);
  };

  const onTaskAdd = () => {
    setCurrentData({ [containerId]: null });
    setTaskModalOpen(true);
  };

  const onTaskDelete = (task: ITaskItem) => {
    setCurrentData({ [containerId]: task });
    setDeleteTaskConfirmationModalOpen(true);
  };

  return (
    <section className="bg-gray-300 w-full rounded-md min-h-48 md:h-[90%] overflow-y-scroll pb-8 shadow-xl">
      <div className="flex items-center justify-between w-full sticky top-0 backdrop-blur-xl">
        <div className="text-start text-gray-600 capitalize px-4 py-2 flex items-center gap-2">
          <button
            onClick={() => onClickContainerEdit()}
            className="shadow-xl text-md border w-4 h-4 flex justify-center items-center rounded-full p-4 bg-gray-600 border-gray-500 text-gray-100"
          >
            &#9998;
          </button>
          <p className="font-bold text-center">{name}</p>
        </div>
        <button onClick={() => onTaskAdd()} className="text-xl px-4 py-2">
          &#43;
        </button>
      </div>

      <Droppable droppableId={containerId} type="group">
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
                    onClick={() => onTaskEdit(task)}
                    {...provided.dragHandleProps}
                    {...provided.draggableProps}
                    ref={provided.innerRef}
                    className="overflow-hidden shadow-xl p-2 flex flex bg-white rounded-md justify-start gap-4 items-center w-full"
                  >
                    <p
                      className={`p-2 h-6 w-6 rounded-full ${priorityColors.get(
                        task.priority
                      )}`}
                    >
                      &nbsp;
                    </p>
                    <p className="truncate overflow-hidden text-ellipsis whitespace-nowrap w-[90%]">
                      {task.name}
                    </p>
                    <button
                      onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                        e.stopPropagation();
                        setCurrentData({ containerId: task });
                        onTaskDelete(task);
                      }}
                      className="flex items-center justify-center w-[10%]"
                    >
                      &#128465;
                    </button>
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
