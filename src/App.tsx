import { useState } from "react";
import Home from "./pages/home/Home";
import {
  createBrowserRouter,
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
const Layout = () => {
  return (
    <div className="layout">
      <Navbar />
      <Outlet />
    </div>
  );
};

const router = createBrowserRouter([
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
      },
      {
        path: "/basket",
        element: <Basket />,
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
          <ToastContainer />
          <Modal />
        </div>
      </Provider>
    </ContextProvider>
  );
};

export default App;
