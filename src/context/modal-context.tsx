import { createContext, useState } from "react";

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

const ContextProvider = ({ children }: any) => {
  const setModalData = (data: any) => {
    console.log("debug");
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
