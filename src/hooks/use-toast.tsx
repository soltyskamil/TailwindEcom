import React from "react";

import { toast } from "react-toastify";
import "../App.css";
import "react-toastify/dist/ReactToastify.css";
import AccountToast from "../components/Toasts/AccountToast";
import type ToastContentProps from "react-toastify";
export const useToast = () => {
  /**
   * @param toastVariant[string]
   */

  const addToast = (toastVariant: string) => {
    const Toast = () => {
      switch (toastVariant) {
        case "DEFAULT":
          return <AccountToast />;
      }
    };

    toast(Toast, {
      closeButton: true,
      ariaLabel: "Test",
      autoClose: 1000000,
    });
  };

  return {
    addToast,
  };
};
