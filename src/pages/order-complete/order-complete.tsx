import React from "react";
import { useLocation } from "react-router";
import { CheckCircle } from "@mui/icons-material";

const OrderComplete = () => {
  const { state } = useLocation();
  console.log(state);

  return (
    <div className="order-completed">
      <div className="order-completed-title">
        <CheckCircle fontSize="large" className="text-green-400 text-3xl" />
        <h2 className="text-5xl text-green-400">Zamówienie potwierdzone!</h2>
      </div>
    </div>
  );
};

export default OrderComplete;
