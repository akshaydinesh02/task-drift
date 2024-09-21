import Modal from "react-modal";
import { IModalFormProps, IModalProps } from "../types";
import React, { ReactNode, ReactElement } from "react";

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

  const renderChildrenWithProps = (children: ReactNode) => {
    return React.Children.map(children, (child) => {
      if (React.isValidElement(child)) {
        return React.cloneElement(child as ReactElement<IModalFormProps>, {
          onRequestClose,
        });
      }
      return child;
    });
  };

  return (
    <div>
      <Modal
        isOpen={isOpen}
        onAfterOpen={onAfterOpen}
        onRequestClose={onRequestClose}
        style={customStyles}
        contentLabel={contentLabel}
      >
        {renderChildrenWithProps(children)}
      </Modal>
    </div>
  );
};

export default ModalComponent;
