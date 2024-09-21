import VerticalCard from "../../components/Dashboard/VerticalCard";
import { useTasks } from "../../contexts/Tasks";
import { DragDropContext } from "react-beautiful-dnd";
import { ICurrentEditingTask, ITaskItem } from "../../types";
import { useCallback, useState } from "react";
import ModalComponent from "../../components/Modal";
import Modal from "react-modal";
import ContainerForm from "../../components/Form/ContainerForm";
import TaskForm from "../../components/Form/TaskForm";

Modal.setAppElement("#root");

const Dashboard = () => {
  const containers = useTasks().containers;
  const [addContainerModalOpen, setAddContainerModalOpen] =
    useState<boolean>(false);
  const [taskModalOpen, setTaskModalOpen] = useState<boolean>(false);
  const [currentEditingTask, setCurrentEditingTask] =
    useState<ICurrentEditingTask | null>(null);

  const onRequestContainerModalClose = useCallback(
    () => setAddContainerModalOpen(false),
    []
  );
  const onRequestTaskModalClose = useCallback(() => {
    setTaskModalOpen(false);
    setCurrentEditingTask(null);
  }, []);

  const openAddContainerModal = useCallback(
    () => setAddContainerModalOpen(true),
    []
  );

  const openAddTaskModal = useCallback(
    (containerId: string, task?: ITaskItem) => {
      setTaskModalOpen(true);
      if (task && containerId) {
        setCurrentEditingTask({ containerId, task });
      }
    },
    []
  );

  return (
    <main className="pt-36 h-screen max-w-5xl mx-auto flex flex-col gap-12">
      <button
        onClick={openAddContainerModal}
        className="border font-bold bg-blue-300 p-2 rounded-md self-end"
      >
        Add Container
      </button>
      <div className="min-h-[90%] grid grid-cols-3 gap-4 gap-y-8">
        <DragDropContext
          onDragEnd={(result) => console.log("Drag started", result)}
        >
          {[...containers.entries()].map(([key, value]) => (
            <VerticalCard
              openAddTaskModal={openAddTaskModal}
              key={key}
              containerId={key}
              name={value.title}
              tasks={value.tasks}
            />
          ))}
        </DragDropContext>
      </div>
      <ModalComponent
        isOpen={taskModalOpen || addContainerModalOpen}
        onRequestClose={
          taskModalOpen ? onRequestTaskModalClose : onRequestContainerModalClose
        }
        contentLabel="Add container"
      >
        {addContainerModalOpen ? (
          <ContainerForm />
        ) : (
          <TaskForm currentEditingTask={currentEditingTask} />
        )}
      </ModalComponent>
    </main>
  );
};

export default Dashboard;
