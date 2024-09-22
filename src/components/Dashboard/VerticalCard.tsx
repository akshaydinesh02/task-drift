import { priorityColors } from "../../constants/colors";
import { Draggable, Droppable } from "@hello-pangea/dnd";
import { ITaskContainer, ITaskItem, IVerticalCardProps } from "../../types";
import { removeTaskFromContainer } from "../../utils/dataManipulation";
import { useData } from "../../contexts/Data";
import { saveToLocalStorage } from "../../utils/localstorage";
import { useAuth } from "../../contexts/Auth";
import { useToggleContext } from "../../contexts/Toggle";

const VerticalCard = (props: IVerticalCardProps) => {
  const { name, tasks, containerId } = props;
  const { containers, setCurrentData } = useData();
  const { user } = useAuth();
  const { setTaskModalOpen } = useToggleContext();

  const onClickContainerEdit = (containerId: string) => {
    console.log("On click container edit button", containerId);
  };
  const onTaskEdit = (task: ITaskItem) => {
    console.log(containerId);
    setCurrentData({ [containerId]: task });
    setTaskModalOpen(true);
  };

  const onTaskAdd = () => {
    setCurrentData({ [containerId]: null });
    setTaskModalOpen(true);
  };

  return (
    <section className="bg-gray-300 w-full rounded-md h-[90%] overflow-y-scroll pb-8">
      <div className="flex items-center justify-between w-full sticky top-0 backdrop-blur-xl">
        <div className="text-start font-extrabold text-gray-600 capitalize px-4 py-2 flex items-center gap-2">
          <button
            onClick={() => onClickContainerEdit(containerId)}
            className="text-md border w-4 h-4 flex justify-center items-center rounded-full p-4 bg-gray-600 border-gray-500 text-gray-100"
          >
            &#9998;
          </button>
          <p>{name}</p>
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
                    className="p-2 flex flex bg-white rounded-md justify-start gap-4 items-center w-full"
                  >
                    <p
                      className={`p-2 h-6 w-6 rounded-full ${priorityColors.get(
                        task.priority
                      )}`}
                    >
                      &nbsp;
                    </p>
                    <p className="w-[90%]">{task.name}</p>
                    <button
                      onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                        e.stopPropagation();
                        const updatedContainers = removeTaskFromContainer(
                          containers,
                          containerId,
                          task.id
                        );
                        saveToLocalStorage(
                          updatedContainers as Map<string, ITaskContainer>,
                          user?.id || ""
                        );
                        console.log(containers);
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
