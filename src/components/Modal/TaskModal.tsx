import { useToggleContext } from "../../contexts/Toggle";
import TaskForm from "../Form/TaskForm";
import ModalComponent from "../Modal";
import { useData } from "../../contexts/Data";

const TaskModal = () => {
  const { taskModalOpen } = useToggleContext();
  const { onRequestTaskModalClose } = useData();

  return (
    <ModalComponent
      isOpen={taskModalOpen}
      onRequestClose={onRequestTaskModalClose}
      contentLabel="Add Task"
    >
      <TaskForm />
    </ModalComponent>
  );
};

export default TaskModal;
