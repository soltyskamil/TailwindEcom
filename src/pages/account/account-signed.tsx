import React, { useContext } from "react";
import { useDispatch } from "react-redux";
import { setLoggedOut } from "../../store/account-reducer";
import { toast } from "react-toastify";
import { store } from "../../store/main-store";
import { ModalContext } from "../../context/modal-context";

const AccountSigned = () => {
  const dispatch = useDispatch();
  const { setModalData } = useContext(ModalContext);

  const openModal = () => {
    setModalData({
      Icon: "WARNING",
      cta: "Wyloguj się",
      description:
        "Czy na pewno chcesz się wylogować? Niektóre funkcje mogą być niedostępne.",
      size: "md",
      title: "Wylogowywanie",
      variant: "WARNING",
    });
  };

  const handleLogout = () => {
    dispatch(setLoggedOut(null));
    toast("Pomyślnie wylogowano!");
  };

  const { loggedIn } = store.getState().accountSliceReducer;
  const { login, name, surname } = loggedIn;

  return (
    <div className="wrapper p-8 border bg-neutral-50 border-neutral-200 w-max m-auto mt-20 flex flex-col gap-4">
      <h3 className="text-4xl">Witaj, {name}</h3>
      <div className="account-data w-max flex flex-col">
        <span className="text-xl">Login: {login}</span>
        <span className="text-xl">Imię: {name}</span>
        <span className="text-xl">Nazwisko: {surname}</span>
      </div>

      <button
        onClick={openModal}
        className="logout-btn border border-neutral-300 p-2 text-xl mt-2 bg-neutral-200 hover:bg-neutral-300 hover:border-neutral-400 transition duration-300 ease-in-out cursor-pointer"
      >
        Wyloguj
      </button>
    </div>
  );
};

export default AccountSigned;
