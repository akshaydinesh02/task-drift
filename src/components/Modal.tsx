import Modal from "react-modal";
import { IModalProps } from "../types";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "30%",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    backdropFilter: "blur(5px)",
  },
};

const ModalComponent = (props: IModalProps) => {
  const { isOpen, onRequestClose, contentLabel, onAfterOpen, children } = props;
  return (
    <div>
      <Modal
        isOpen={isOpen}
        onAfterOpen={onAfterOpen}
        onRequestClose={onRequestClose}
        style={customStyles}
        contentLabel={contentLabel}
      >
        {children}
      </Modal>
    </div>
  );
};

export default ModalComponent;
