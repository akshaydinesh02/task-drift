import { useToggleContext } from "../../contexts/Toggle";
import ModalComponent from "../Modal";
import { useData } from "../../contexts/Data";
import ContainerForm from "../Form/ContainerForm";

const ContainerModal = () => {
  const { containerModalOpen } = useToggleContext();
  const { onRequestContainerModalClose } = useData();

  return (
    <ModalComponent
      isOpen={containerModalOpen}
      onRequestClose={onRequestContainerModalClose}
      contentLabel="Add Container"
    >
      <ContainerForm />
    </ModalComponent>
  );
};

export default ContainerModal;
