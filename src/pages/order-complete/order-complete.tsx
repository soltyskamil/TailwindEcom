import React from "react";
import { Link, useLocation, useParams } from "react-router";
import { CheckCircle } from "@mui/icons-material";
import type { ProductCardData } from "../../components/basket/basket-product";
import ProductCard from "../../components/ProductCard/ProductCard";
import ProductOrder from "../../components/order/order-product";
import orderImg from "../../assets/hero-images/hero-images5.webp";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
const OrderComplete = () => {
  const { state } = useLocation();
  const { products, formValues } = state;
  const { deliveryOption } = formValues;
  const deliveryCost =
    deliveryOption === "standard"
      ? 15.99
      : deliveryOption === "express"
      ? 21.99
      : 0;

  console.log(formValues);

  const itemsPrice = products.reduce((acc: number, curr: ProductCardData) => {
    acc += curr.price * curr.quantity;
    return acc;
  }, 0);

  return (
    <div className="order-completed max-w-[1440px] m-auto min-h-dvh grid grid-cols-[1fr_1fr] p-12 max-[1024px]:grid-cols-1 max-[650px]:p-4">
      <div
        className="order-completed-left border-l-1 max-[1024px]:hidden border-y-1 border-neutral-200 bg-center bg-cover bg-neutral-400 bg-blend-multiply rounded-l-md"
        style={{ backgroundImage: `url(${orderImg})` }}
      />
      <div className="order-completed-right border-r-1  bg-neutral-50 max-[1024px]:bg-[url('assets/hero-images/hero-images5.webp')] max-[1024px]:bg-cover max-[1024px]:bg-center max-[1024px]:bg-green-300 max-[1024px]:rounded-none max-[1024px]:bg-blend-multiply border-y-1 border-neutral-200 rounded-r-md p-24 max-[1024px]:p-12 pr-8 max-[650px]:p-4">
        <div className="order-completed-wrapper-overlay max-[1024px]:bg-white/75 max-[1024px]:p-12 max-[650px]:p-8">
          <div className="order-completed-right-description border-b-1 pb-12 border-neutral-200 flex flex-col gap-2">
            <span className="text-blue-500">Płatność potwierdzona</span>
            <h2 className="text-4xl font-bold">Dziękujemy za zakupy</h2>
            <span className="text-neutral-700">
              Doceniamy twoje zamówienie i właśnie je przetwarzamy. Wkrótce
              wyślemy potwierdzenie zamówienia na twój adres email.
            </span>
          </div>
          {products.map((p: ProductCardData) => {
            return <ProductOrder {...p} />;
          })}
          <div className="order-completed-right-subtotal border-t-1 border-t-neutral-300 pt-12">
            <div className="order-completed-right-subtotal-details flex flex-col gap-2">
              <div className="order-completed-right-subtotal-details-total flex justify-between items-center">
                <span className="text-neutral-700">Wartość przedmiotów:</span>
                <span className="text-neutral-800 font-bold">
                  ${itemsPrice.toFixed(2)}
                </span>
              </div>
              <div className="order-completed-right-subtotal-details-shipping flex justify-between items-center mb-12">
                <span className="text-neutral-700">Przesyłka:</span>
                <span className="text-neutral-800 font-bold">
                  ${deliveryCost}
                </span>
              </div>
            </div>
            <div className="order-completed-right-subtotal-full border-b-1 flex justify-between py-12 border-t-1 border-neutral-300">
              <span className="text-neutral-800 font-bold text-lg">
                Cena całkowita:{" "}
              </span>
              <span className="text-neutral-800 font-bold">
                ${(itemsPrice + deliveryCost).toFixed(2)}
              </span>
            </div>
            <button className="mt-4 ml-auto flex group gap-1 items-center text-blue-600 hover:text-blue-800 cursor-pointer">
              <Link to={"/"} className="group-hover:text-blue-800">
                Kontynuuj zakupy
              </Link>
              <ArrowForwardIcon className="text-blue-600 mt-0.1 w-[16px]! h-[16px]! group-hover:text-blue-800" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderComplete;
