import VerticalCard from "../../components/Dashboard/VerticalCard";
import { useData } from "../../contexts/Data";
import { DragDropContext, DropResult } from "@hello-pangea/dnd";
import { ICurrentEditingTask, ITaskItem } from "../../types";
import { useCallback, useState } from "react";
import ModalComponent from "../../components/Modal";
import Modal from "react-modal";
import ContainerForm from "../../components/Form/ContainerForm";
import TaskForm from "../../components/Form/TaskForm";
import { saveToLocalStorage } from "../../utils/localstorage";
import { useAuth } from "../../contexts/Auth";
import { useToggleContext } from "../../contexts/Toggle";
import TaskModal from "../../components/Modal/TaskModal";
import ContainerModal from "../../components/Modal/ContainerModal";

Modal.setAppElement("#root");

const Dashboard = () => {
  const { containers, resetData, handleTaskDrag } = useData();

  const {
    containerModalOpen,
    setContainerModalOpen,
    taskModalOpen,
    setTaskModalOpen,
  } = useToggleContext();

  const openAddTaskModal = useCallback(
    (containerId: string, task?: ITaskItem) => {
      setTaskModalOpen(true);
    },
    []
  );

  return (
    <main className="pt-36 h-screen max-w-5xl mx-auto flex flex-col gap-12">
      <div className="self-end flex gap-4">
        <button
          onClick={resetData}
          className="border font-bold bg-blue-300 p-2 rounded-md"
        >
          Reset
        </button>
        <button
          onClick={() => setContainerModalOpen(true)}
          className="border font-bold bg-blue-300 p-2 rounded-md"
        >
          Add Container
        </button>
      </div>
      <div className="min-h-[90%] grid grid-cols-3 gap-4 gap-y-8">
        <DragDropContext onDragEnd={handleTaskDrag}>
          {[...containers.entries()].map(([key, value]) => (
            <VerticalCard
              key={key}
              containerId={key}
              name={value.title}
              tasks={value.tasks}
            />
          ))}
        </DragDropContext>
        <TaskModal />
        <ContainerModal />
      </div>
    </main>
  );
};

export default Dashboard;
{
  /* <ModalComponent
isOpen={taskModalOpen || containerModalOpen || containerEditModalOpen}
onRequestClose={
  taskModalOpen ? onRequestTaskModalClose : onRequestContainerModalClose
}
contentLabel={taskModalOpen ? "Add Task" : "Add Container"}
>
{containerModalOpen ? <ContainerForm /> : <></>}
{taskModalOpen ? (
  <TaskForm
    currentEditingTask={currentEditingTask}
    newTaskContainerId={newTaskContainerId}
  />
) : (
  <></>
)}
</ModalComponent> */
}
