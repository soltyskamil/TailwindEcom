import React from "react";
import { useLocation } from "react-router";
import { Formik } from "formik";
import { useState } from "react";
import "./Order.scss";
const Order = () => {
  const { state } = useLocation();
  const { id, title, price, description, category, image, rating } = state;
  const [deliveryOption, setDeliveryOption] = useState({
    courier: true,
    shop: false,
  });

  const handleDelivery = (action: "courier" | "shop") => {
    if (action === "courier") {
      setDeliveryOption((prev: any) => ({
        shop: false,
        courier: true,
      }));
    } else if (action === "shop") {
      setDeliveryOption((prev: any) => ({
        courier: false,
        shop: true,
      }));
    }
  };

  return (
    <div className="order">
      <div className="order-title">
        <h3>Dostawa i płatność</h3>
        <span>
          Prezentujemy tylko opcje dostępne dla tego zamówienia. Wypełniamy je
          na podstawie Twoich ostatnich zakupów.
        </span>
      </div>
      <div className="order-delivery m-auto w-max">
        <div
          onClick={() => handleDelivery("courier")}
          className="order-delivery-option flex gap-2 "
        >
          <div
            className={`order-radio ${deliveryOption.courier && "active"}`}
          />
          <div className="order-delivery-option-details flex flex-col text-sm">
            <span>Kurier</span>
            <span>Najwcześniej u Ciebie: pojutrze</span>
          </div>
        </div>

        <div
          onClick={() => handleDelivery("shop")}
          className="order-delivery-option flex gap-2 "
        >
          <div className={`order-radio ${deliveryOption.shop && "active"}`} />
          <div className="order-delivery-option-details flex flex-col text-sm">
            <span>Salon hips</span>
            <span>Najwcześniej u Ciebie: pojutrze</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;
