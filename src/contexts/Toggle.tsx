import { createContext, ReactNode, useContext, useState } from "react";
import { IToggleContext } from "../types";

const ToggleContextInitialValues = {
  containerEditModalOpen: false,
  setContainerEditModalOpen: () => {},
  containerModalOpen: false,
  setContainerModalOpen: () => {},
  taskModalOpen: false,
  setTaskModalOpen: () => {},
  resetConfirmationModalOpen: false,
  setResetConfirmationModalOpen: () => {},
  deleteTaskConfirmationModalOpen: false,
  setDeleteTaskConfirmationModalOpen: () => {},
};

const ToggleContext = createContext<IToggleContext>(ToggleContextInitialValues);

const ToggleContextProvider = ({ children }: { children: ReactNode }) => {
  const [containerEditModalOpen, setContainerEditModalOpen] =
    useState<boolean>(false);
  const [containerModalOpen, setContainerModalOpen] = useState<boolean>(false);
  const [taskModalOpen, setTaskModalOpen] = useState<boolean>(false);
  const [resetConfirmationModalOpen, setResetConfirmationModalOpen] =
    useState<boolean>(false);
  const [deleteTaskConfirmationModalOpen, setDeleteTaskConfirmationModalOpen] =
    useState<boolean>(false);

  const value = {
    containerEditModalOpen,
    setContainerEditModalOpen,
    containerModalOpen,
    setContainerModalOpen,
    taskModalOpen,
    setTaskModalOpen,
    resetConfirmationModalOpen,
    setResetConfirmationModalOpen,
    deleteTaskConfirmationModalOpen,
    setDeleteTaskConfirmationModalOpen,
  };

  return (
    <ToggleContext.Provider value={value}>{children}</ToggleContext.Provider>
  );
};

export const useToggleContext = () => {
  return useContext(ToggleContext);
};

export default ToggleContextProvider;
