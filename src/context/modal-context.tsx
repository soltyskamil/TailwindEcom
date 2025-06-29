import { createContext, useState } from "react";
import type { PropsWithChildren } from "react";
type modalProps = {
  modal: {
    [key: string]: any;
  };
  setModalData: (data: any) => void;
  closeModal: () => void;
};

const modal: modalProps = {
  modal: {
    Icon: "",
    title: "",
    description: "",
    cta: "",
    variant: "",
    size: "",
  },
  setModalData: () => {},
  closeModal: () => {},
};

export const ModalContext = createContext(modal);

const ContextProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const setModalData = (data: any) => {
    setModalState((prev) => ({
      ...prev,
      modal: data,
    }));
  };

  const deleteModalData = () => {
    setModalState((prev) => ({
      ...prev,
      modal: {
        Icon: "",
        title: "",
        description: "",
        cta: "",
        variant: "",
        size: "",
      },
    }));
  };

  const initState: modalProps = {
    modal: {
      Icon: "",
      title: "",
      description: "",
      cta: "",
      variant: "",
      size: "",
    },
    setModalData: setModalData,
    closeModal: deleteModalData,
  };

  const [modalState, setModalState] = useState(initState);

  return (
    <ModalContext.Provider value={modalState}>{children}</ModalContext.Provider>
  );
};

export default ContextProvider;
