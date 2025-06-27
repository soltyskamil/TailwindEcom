import React from "react";
import ListAltIcon from "@mui/icons-material/ListAlt";
import { FavoriteBorderOutlined } from "@mui/icons-material";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import { Link, Outlet, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useContext } from "react";
import { ModalContext } from "../../../context/modal-context";
type AccountPanelProps = {
  name: string;
};
const AccountPanel = ({ name }: AccountPanelProps) => {
  const { setModalData } = useContext(ModalContext);
  const { pathname } = useLocation();

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

  return (
    <div className="account-panel-wrapper grid grid-cols-[auto_1fr] max-[1024px]:grid-cols-1">
      <div className="account-panel w-max p-8 max-[800px]:p-4 flex flex-col gap-0.5  border-r-2 border-r-neutral-300 max-[1024px]:border-r-0 max-[1024px]:w-full max-[1024px]:text-center">
        <h3 className="text-xl">
          Witaj, <span className="font-bold">{name}</span>
        </h3>
        <div className="account-panel-actions flex flex-col gap-1 ">
          <Link
            to="/account/orders"
            className={`text-md flex items-center gap-1 p-2 rounded-md hover:bg-neutral-100 transition duration-300 ease-in-out ${
              pathname === "/account/orders" && "bg-neutral-100"
            }`}
          >
            <ListAltIcon fontSize="small" />
            <span className="text-sm">Zamówienia</span>
          </Link>
          <Link
            to="/account/wishlist"
            className={`text-md flex items-center gap-1 p-2 rounded-md hover:bg-neutral-100 transition duration-300 ease-in-out ${
              pathname === "/account/wishlist" && "bg-neutral-100"
            }`}
          >
            <FavoriteBorderOutlined fontSize="small" />
            <span className="text-sm">Listy zakupowe</span>
          </Link>
          <Link
            to="/account/settings"
            className={`text-md flex items-center gap-1 p-2 rounded-md hover:bg-neutral-100 transition duration-300 ease-in-out ${
              pathname === "/account/settings" && "bg-neutral-100"
            }`}
          >
            <SettingsOutlinedIcon fontSize="small" />
            <span className="text-sm">Ustawienia konta</span>
          </Link>
        </div>
        <button
          onClick={openModal}
          className="logout-btn border border-red-600 text-white p-0.5 px-2 text-sm m-2 bg-red-500 rounded-sm hover:bg-red-600 hover:border-red-700 transition duration-300 ease-in-out cursor-pointer w-min"
        >
          Wyloguj
        </button>
      </div>
      <div className="account-selected-option">
        <Outlet />
      </div>
    </div>
  );
};

export default AccountPanel;
