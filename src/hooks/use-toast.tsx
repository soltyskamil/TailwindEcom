import React from "react";
import { toast } from "react-toastify";
import "../App.css";
import "react-toastify/dist/ReactToastify.css";
import type ToastContentProps from "react-toastify";
import CustomProgressBar from "../components/Toasts/CustomProgressBar";
import { Link, useLocation } from "react-router-dom";
export const useToast = () => {
  /**
   * @param toastVariant[string]
   */

  const addToast = (
    toastVariant: string,
    title: string,
    description: string,
    link?: string,
    pathname?: string,
    options?: {
      [key: string]: any;
    }
  ) => {
    switch (toastVariant) {
      case "DEFAULT":
        toast(CustomToast, {
          closeButton: false,
          position: "top-right",
          ariaLabel: "Success",
          autoClose: 5,
          data: { title, description, options, link },
          style: { border: "none", padding: "0px" },
          className: "p-0 w-[400px] border border-purple-600/40",
          customProgressBar: true,
        });
        return;
      case "ERROR":
        toast(CustomToastError, {
          closeButton: false,
          position: "top-right",
          ariaLabel: "Error",
          autoClose: 5,
          data: { title, description, options, pathname },
          style: { border: "none", padding: "0px" },
          className: "p-0 w-[400px] border border-purple-600/40",
          customProgressBar: true,
        });
    }
  };

  return {
    addToast,
  };
};
interface CustomToastProps extends ToastContentProps {
  title?: string;
  description?: string;
}

function CustomToast({ closeToast, isPaused, data }: CustomToastProps) {
  return (
    <div className="success-toast-wrapper flex flex-col w-full ">
      <div className="success-toast border border-green-400 border-b-0 p-0 flex w-full min-h-[68px] rounded-[6px_6px_0px_0px] relative">
        <div className="success-toast-content flex flex-1 flex-col mr-2 justify-around p-2">
          <span className="text-sm font-bold">{data.title}</span>
          <span className="text-sm">{data.description}</span>
        </div>
        {data.options && (
          <div className="success-toast-actions flex flex-col overflow-hidden rounded-tr-md border-l-1 border-neutral-300 ">
            <button
              onClick={closeToast}
              className="w-full h-full flex justify-center items-center cursor-pointer p-1 hover:bg-neutral-100 transition duration-300 ease-in-out "
            >
              <span className="text-sm ">{data.options.close}</span>
            </button>
            <hr className="text-neutral-300" />
            <Link
              to={data.link}
              className="w-full flex items-center h-full cursor-pointer p-1 gap-0.5 hover:bg-neutral-100 transition duration-300 ease-in-out "
            >
              <span className="text-sm">{data.options.success}</span>
            </Link>
          </div>
        )}
      </div>
      <CustomProgressBar
        variant="SUCCESS"
        isPaused={isPaused}
        onAnimationEnd={closeToast}
      />
    </div>
  );
}
const CustomToastError = ({ closeToast, isPaused, data }: CustomToastProps) => {
  return (
    <div className="success-toast-wrapper flex flex-col w-full ">
      <div className="success-toast border border-red-400 border-b-0 p-0 flex w-full min-h-[68px] rounded-[6px_6px_0px_0px] relative">
        <div className="success-toast-content flex flex-1 flex-col mr-2 justify-around p-2">
          <span className="text-sm font-bold">{data.title}</span>
          <span className="text-sm">{data.description}</span>
        </div>
        {data.options && (
          <div className="success-toast-actions flex flex-col overflow-hidden rounded-tr-md border-l-1 border-neutral-300 ">
            <button
              onClick={closeToast}
              className="w-full h-full flex justify-center items-center cursor-pointer p-1 hover:bg-neutral-100 transition duration-300 ease-in-out "
            >
              <span className="text-sm ">{data.options.close}</span>
            </button>
            <hr className="text-neutral-300" />
            <Link
              state={{ from: `${data.pathname}`, to: "/account" }}
              to="/account"
              className="w-full flex items-center justify-center h-full cursor-pointer p-1 gap-0.5 hover:bg-neutral-100 transition duration-300 ease-in-out "
            >
              <span className="text-sm">{data.options.success}</span>
            </Link>
          </div>
        )}
      </div>
      <CustomProgressBar
        variant="ERROR"
        isPaused={isPaused}
        onAnimationEnd={closeToast}
      />
    </div>
  );
};
