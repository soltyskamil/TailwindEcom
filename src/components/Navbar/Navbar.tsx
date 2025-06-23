import React from "react";
import { useRef } from "react";
import logo from "../../assets/logo.svg";
import { Link } from "react-router";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import MenuIcon from "@mui/icons-material/Menu";
const ROUTES = [
  {
    to: "/new-arrivals",
    name: "Nowości",
  },
  {
    to: "/colaborations",
    name: "Kolaboracje",
  },
  {
    to: "/categories",
    name: "Kategorie",
  },
  {
    to: "/on-sale",
    name: "Wyprzedaż",
  },
  {
    to: "/account",
    icon: <AccountCircleIcon fontSize="large" />,
  },
  {
    to: "/account/wishlist",
    icon: <FavoriteIcon fontSize="large" />,
  },
  {
    to: "/basket",
    icon: <ShoppingBasketIcon fontSize="large" />,
  },
];

const Navbar = () => {
  const menuRef = useRef<HTMLDivElement | null>(null);
  const menuIconRef = useRef<any | null>(null);

  const handleMenuAnimation = () => {
    if (!menuRef.current || !menuIconRef.current) return;
    menuRef.current.classList.toggle("max-[1024px]:left-0");
    menuIconRef.current.classList.toggle("rotate-90");
  };

  return (
    <div className="wrapper w-full bg-white shadow-2xl">
      <div className=" flex items-center  p-2 max-w-[1440px] w-full m-auto justify-between relative">
        <div className="logo-container h-24 flex">
          <Link to={"/"}>
            <img src={logo} alt="logo" className="h-full shrink-0" />
          </Link>
        </div>
        <div
          ref={menuRef}
          className="wrapper z-100 flex flex-1 max-[1024px]:flex-col max-[1024px]:absolute max-[1024px]:top-0 max max-[1024px]:justify-center max-[1024px]:p-4 max-[1024px]:transition-all max-[1024px]:duration-300 max-[1024px]:ease-in max-[1024px]:-left-100 max-[1024px]:gap-12 max-[1024px]:h-dvh max-[1024px]:bg-white max-[1024px]:shadow-2xl "
        >
          <div className="menu-container flex gap-8 m-auto max-[1024px]:flex-col max-[1024px]:m-0">
            {ROUTES.slice(0, 4).map((route: any, idx: number) => (
              <Link to={route.to} className="text-2xl" key={`link-${idx}`}>
                {route.name}
              </Link>
            ))}
          </div>
          <div className="account-container">
            {ROUTES.slice(-3).map((route: any, idx: number) => (
              <Link
                to={route.to}
                key={`account-${idx}`}
                className="text-2xl mx-2 max-[1024px]:mx-0 max-[1024px]:mr-2"
              >
                {route.icon}
              </Link>
            ))}
          </div>
        </div>
        <div
          className="hamburger hidden max-[1024px]:block  cursor-pointer transition duration-300 ease-in-out"
          ref={menuIconRef}
          onClick={handleMenuAnimation}
        >
          <MenuIcon fontSize="large" />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
