import { useToggleContext } from "../../contexts/Toggle";
import ModalComponent from "../Modal";
import { useData } from "../../contexts/Data";
import Confirmation from "../Confirmation";

const ConfirmationModal = () => {
  const { resetConfirmationModalOpen, deleteTaskConfirmationModalOpen } =
    useToggleContext();
  const {
    onRequestResetConfirmationModalClose,
    onRequestDeleteTaskConfirmationModalClose,
    resetData,
    deleteTask,
    currentData,
  } = useData();

  return (
    <ModalComponent
      isOpen={resetConfirmationModalOpen || deleteTaskConfirmationModalOpen}
      onRequestClose={
        resetConfirmationModalOpen
          ? onRequestResetConfirmationModalClose
          : onRequestDeleteTaskConfirmationModalClose
      }
      contentLabel={
        resetConfirmationModalOpen
          ? "Reset Data Confirmation"
          : "Delete Task Confirmation"
      }
    >
      <Confirmation
        header={resetConfirmationModalOpen ? "Reset Data" : "Delete Task"}
        warning={
          resetConfirmationModalOpen
            ? "Warning: This will delete all data!!!"
            : "Warning: This will delete the task!!!"
        }
        proceedClickHandler={() => {
          const deleteTaskContainerId = Object.keys(currentData)[0];
          const deleteTaskId = Object.values(currentData)[0]?.id || null;
          if (resetConfirmationModalOpen) {
            resetData();
          } else if (deleteTaskConfirmationModalOpen && deleteTaskId) {
            deleteTask(deleteTaskId, deleteTaskContainerId);
          }
        }}
        cancelClickHandler={
          resetConfirmationModalOpen
            ? onRequestResetConfirmationModalClose
            : onRequestDeleteTaskConfirmationModalClose
        }
      />
    </ModalComponent>
  );
};

export default ConfirmationModal;
