import React from "react";
import type { ProductCardData } from "../basket/basket-product";
const ProductOrder = ({
  image,
  discount,
  title,
  category,
  description,
  rating,
  id,
  ref,
  quantity,
  price,
}: ProductCardData) => {
  return (
    <div className="product-order border border-neutral-300 my-4 p-2 h-auto grid grid-cols-[1fr_auto] bg-white rounded-md">
      <div className="product-order-details flex h-auto gap-2 max-[650px]:flex-col">
        <img
          src={image}
          alt="order-image"
          className="w-24 object-contain h-24 my-auto bg-white"
        />
        <div className="product-order-description flex flex-col flex-1 justify-evenly gap-1">
          <span className="font-bold">{title}</span>
          <span className="text-neutral-600">Ilość: {quantity}</span>
          <span className="text-neutral-600">Ocena: {rating.rate}</span>
        </div>
      </div>
      <div className="product-order-price">
        <span>${price * quantity}</span>
      </div>
    </div>
  );
};

export default ProductOrder;
