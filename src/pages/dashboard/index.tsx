import VerticalCard from "../../components/Dashboard/VerticalCard";
import { useData } from "../../contexts/Data";
import { DragDropContext } from "@hello-pangea/dnd";
import Modal from "react-modal";
import { useToggleContext } from "../../contexts/Toggle";
import TaskModal from "../../components/Modal/TaskModal";
import ContainerModal from "../../components/Modal/ContainerModal";
import ContainerEditModal from "../../components/Modal/ContainerEditModal";
import ResetConfirmationModal from "../../components/Modal/ResetConfirmationModal";

Modal.setAppElement("#root");

const Dashboard = () => {
  const { containers, handleTaskDrag } = useData();

  const { setContainerModalOpen, setResetConfirmationModalOpen } =
    useToggleContext();

  return (
    <main className="pt-16 h-screen max-w-5xl mx-auto flex flex-col gap-12">
      <div className="self-end flex gap-4">
        <button
          disabled={containers.size <= 0}
          onClick={() => setResetConfirmationModalOpen(true)}
          className="border font-bold bg-blue-300 p-2 rounded-md disabled:bg-gray-400"
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
        <ContainerEditModal />
        <ResetConfirmationModal />
      </div>
    </main>
  );
};

export default Dashboard;
