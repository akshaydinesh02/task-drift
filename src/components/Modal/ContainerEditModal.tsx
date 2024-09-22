import { useToggleContext } from "../../contexts/Toggle";
import ModalComponent from "../Modal";
import { useData } from "../../contexts/Data";
import ContainerEditForm from "../Form/ContainerEditForm";

const ContainerEditModal = () => {
  const { containerEditModalOpen } = useToggleContext();
  const { onRequestContainerEditModalClose } = useData();

  return (
    <ModalComponent
      isOpen={containerEditModalOpen}
      onRequestClose={onRequestContainerEditModalClose}
      contentLabel="Add Container"
    >
      <ContainerEditForm />
    </ModalComponent>
  );
};

export default ContainerEditModal;
