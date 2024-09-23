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
    borderRadius: "12px",
    width: "90%",
    maxWidth: "500px",

    "@media(minWidth: 640px)": {
      width: "80%", // Tablets (sm)
    },
    "@media(minWidth: 768px)": {
      width: "60%", // Tablets and small laptops (md)
    },
    "@media(minWidth: 1024px)": {
      width: "40%", // Laptops and desktops (lg)
    },
    "@media(minWidth: 1280px)": {
      width: "30%", // Larger screens (xl)
    },
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
    <div className="relative">
      <Modal
        isOpen={isOpen}
        onAfterOpen={onAfterOpen}
        onRequestClose={onRequestClose}
        style={customStyles}
        contentLabel={contentLabel}
      >
        <button
          className=" absolute top-0 right-0 my-2 mx-4"
          onClick={onRequestClose}
        >
          &#10005;
        </button>
        {renderChildrenWithProps(children)}
      </Modal>
    </div>
  );
};

export default ModalComponent;
