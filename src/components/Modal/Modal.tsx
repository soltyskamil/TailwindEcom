import React, { useEffect, useState, useRef } from "react";
import { useContext } from "react";
import { ModalContext } from "../../context/modal-context";
import { Close } from "@mui/icons-material";
import InfoOutlineIcon from "@mui/icons-material/InfoOutline";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { useDispatch } from "react-redux";
import { setLoggedOut } from "../../store/account-reducer";
import { useToast } from "../../hooks/use-toast";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { purgeStoredState, PURGE } from "redux-persist";
import { persistConfig } from "../../store/main-store";
import { reset } from "../../store/products-reducer";
import { setOrders } from "../../store/account-reducer";

type INIT_DATA_PROPS = {
  [key: string]: string;
};

const INIT_DATA: INIT_DATA_PROPS = {
  Icon: "",
  title: "",
  description: "",
  cta: "",
  variant: "",
  size: "",
};

const Modal = () => {
  const { modal, closeModal } = useContext(ModalContext);
  const { addToast } = useToast();
  const modalRef = useRef<HTMLDivElement | null>(null);
  const { Icon, title, description, cta, variant, size } = modal;
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();

  const iconComponent = () => {
    switch (Icon) {
      case "INFO":
        return <InfoOutlineIcon color="info" fontSize="large" />;
      case "WARNING":
        return <ErrorOutlineIcon color="warning" fontSize="large" />;
      case "SUCCESS":
        return <CheckCircleOutlineIcon color="success" fontSize="large" />;
    }
  };

  type sizeClassesProps = {
    [key: string]: string;
  };

  const sizeClasses: sizeClassesProps = {
    sm: "w-sm",
    md: "w-md",
    lg: "w-lg",
  };

  useEffect(() => {
    for (const modalDataKey in modal) {
      for (const initDataKey in INIT_DATA) {
        if (modal[modalDataKey] !== INIT_DATA[initDataKey]) {
          if (modalRef.current) {
            modalRef.current.style.display = "flex";
          }
          setTimeout(() => {
            setVisible(true);
          }, 100);
        } else return;
      }
    }
  }, [modal]);

  const handleCloseModal = () => {
    setVisible(false);
    setTimeout(() => {
      closeModal;
      if (modalRef.current) {
        modalRef.current.style.display = "none";
      }
    }, 500);
  };

  const handleLogout = () => {
    dispatch(setLoggedOut(null));
    dispatch(reset());
    dispatch(setOrders({ type: "RESET" }));
    // dispatch({
    //   type: PURGE,
    //   key: "root",
    //   result: () => null,
    // });

    addToast("DEFAULT", "Wylogowałeś się", "Pomyślnie wylogowano z konta");
  };

  switch (variant) {
    case "DEFAULT":
      return (
        <>
          <div
            ref={modalRef}
            className={`modal flex flex-col p-4 z-20 rounded-md transition duration-500 ease-in-out ${
              sizeClasses[size]
            } h-1/2 border border-neutral-200 bg-neutral-50 absolute top-1/2 left-1/2  -translate-y-1/2 -translate-x-1/2 ${
              visible
                ? "opacity-100 pointer-events-auto"
                : "opacity-0 pointer-events-none"
            }`}
          >
            <div className="modal-title flex items-center pb-4 border-b border-neutral-300">
              {iconComponent()}
              <h5 className="font-bold text-2xl">{title}</h5>
              <button className="block ml-auto" onClick={handleCloseModal}>
                <Close color="disabled" className="cursor-pointer" />
              </button>
            </div>
            <div className="modal-description mt-5">
              <span className="text-neutral-700 text-lg">{description}</span>
            </div>

            <div className="modal-cta mt-auto w-max">
              <button
                onClick={handleCloseModal}
                className="border border-neutral-500 p-2 transition duration-500  ease-in-out hover:bg-blue-500 w-max rounded-md bg-blue-300 text-xl cursor-pointer"
              >
                {cta}
              </button>
            </div>
          </div>
          <div
            className={`modal-overlay absolute h-dvh w-full ${
              visible ? "opacity-70" : "opacity-0"
            } top-0 bg-black z-10
              pointer-events-none
              transition duration-300 ease-in-out
            `}
          />
        </>
      );
    case "SUCCESS":
      return (
        <>
          <div
            ref={modalRef}
            className={`modal flex flex-col p-4 z-20 rounded-md transition duration-500 ease-in-out ${
              sizeClasses[size]
            } h-1/2 border border-green-400 bg-green-200 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${
              visible
                ? "opacity-100 pointer-events-auto"
                : "opacity-0 pointer-events-none"
            }`}
          >
            <div className="modal-title flex items-center pb-4 border-b border-neutral-800">
              {iconComponent()}
              <h5 className="font-bold text-neutral-500 text-xl">{title}</h5>
              <button className="block ml-auto" onClick={handleCloseModal}>
                <Close color="disabled" className="cursor-pointer" />
              </button>
            </div>
            <div className="modal-description mt-5">
              <span className="text-neutral-500 text-lg">{description}</span>
            </div>
            <div className="modal-cta mt-auto w-max">
              <button
                onClick={handleCloseModal}
                className="border border-neutral-500 p-2 transition duration-500  ease-in-out hover:bg-blue-500 w-max rounded-md bg-blue-300 text-xl cursor-pointer"
              >
                {cta}
              </button>
            </div>
          </div>
          <div
            className={`modal-overlay absolute h-dvh w-full ${
              visible ? "opacity-70" : "opacity-0"
            } top-0 bg-black z-10
              pointer-events-none
              transition duration-300 ease-in-out
            `}
          />
        </>
      );
    case "WARNING":
      return (
        <>
          <div
            ref={modalRef}
            className={`modal flex flex-col p-4 rounded-md z-20 transition duration-500 ease-in-out w-${size} h-1/2 border border-neutral-200 bg-neutral-50 absolute top-1/2 left-1/2  -translate-y-1/2 -translate-x-1/2 ${
              visible
                ? "opacity-100 pointer-events-auto"
                : "opacity-0 pointer-events-none"
            }`}
          >
            <div className="modal-title flex items-center pb-4 border-b border-neutral-300">
              {iconComponent()}
              <h5 className="font-bold text-xl">{title}</h5>
              <button className="block ml-auto" onClick={handleCloseModal}>
                <Close color="disabled" className="cursor-pointer" />
              </button>
            </div>
            <div className="modal-description mt-5">
              <span className="text-neutral-700 text-lg">{description}</span>
            </div>
            <div className="modal-cta mt-auto w-max">
              <button
                onClick={() => {
                  handleLogout();
                  handleCloseModal();
                }}
                className="border border-neutral-500 p-2 transition duration-500  ease-in-out hover:bg-red-400 w-max rounded-md bg-red-300 text-xl cursor-pointer"
              >
                {cta}
              </button>
            </div>
          </div>
          <div
            className={`modal-overlay absolute h-dvh w-full ${
              visible ? "opacity-70" : "opacity-0"
            } top-0 bg-black z-10
              pointer-events-none
              transition duration-300 ease-in-out
            `}
          />
        </>
      );
  }
};

export default Modal;
