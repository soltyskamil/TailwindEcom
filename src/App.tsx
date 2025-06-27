import { useState } from "react";
import Home from "./pages/home/Home";
import {
  BrowserRouter,
  createBrowserRouter,
  UNSAFE_createBrowserHistory,
  Outlet,
  Router,
  RouterProvider,
} from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import { Provider } from "react-redux";
import { store } from "./store/main-store";
import { ToastContainer } from "react-toastify";
import Account from "./pages/account/Account";
import ContextProvider from "./context/modal-context";
import Modal from "./components/Modal/Modal";
import Basket from "./pages/basket/Basket";
import AccountOrders from "./components/Account/account-orders/account-orders";
import AccountWishlist from "./components/Account/account-wishlist/account-wishlist";
import AccountSettings from "./components/Account/account-settings/account-settings";
import Footer from "./components/Footer/footer";
import Order from "./pages/order/Order";
import OrderComplete from "./pages/order-complete/order-complete";
const Layout = () => {
  return (
    <div className="layout">
      <Navbar />
      <Outlet />
      <Footer />
      <ToastContainer />
      <Modal />
    </div>
  );
};

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/account",
        element: <Account />,
        children: [
          {
            path: "/account",
            element: <AccountOrders />,
          },
          {
            path: "/account/orders",
            element: <AccountOrders />,
          },
          {
            path: "/account/wishlist",
            element: <AccountWishlist />,
          },
          {
            path: "/account/settings",
            element: <AccountSettings />,
          },
        ],
      },
      {
        path: "/basket",
        element: <Basket />,
      },
      {
        path: "/order",
        element: <Order />,
      },
      {
        path: "/order/complete",
        element: <OrderComplete />,
      },
    ],
  },
]);

const App = () => {
  return (
    <ContextProvider>
      <Provider store={store}>
        <div className="app">
          <RouterProvider router={router} />
        </div>
      </Provider>
    </ContextProvider>
  );
};

export default App;
