import React from "react";
import { Close } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import {
  changeProductQuantity,
  removeFromBasket,
} from "../../store/products-reducer";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useHandleBasketTotal } from "../../hooks/handle-basket-total";
type ProductCardData = {
  image: string;
  discount?: number;
  title: string;
  category: string;
  price: number;
  description?: string;
  rating: {
    count: number;
    rate: number;
  };

  id: number;
  ref?: React.Ref<HTMLDivElement>;
};
const ProductCardBasket = ({
  image,
  discount,
  title,
  category,
  description,
  rating,
  id,
  ref,
  price,
}: ProductCardData) => {
  const dispatch = useDispatch();

  const productsState = useSelector((state: any) => state.productsSliceReducer);
  const currentProduct = productsState.basket.find(
    (product: any) => product.id === id
  );

  const quantity = currentProduct?.quantity;
  const handleQuantity = (action: "-" | "+") => {
    if (action === "+") {
      dispatch(changeProductQuantity({ id: id, quantity: quantity + 1 }));
    }

    if (action === "-") {
      dispatch(changeProductQuantity({ id: id, quantity: quantity - 1 }));
    }
  };
  const handleRemoveProduct = () => {
    dispatch(removeFromBasket({ id }));
  };

  return (
    <div className="product-card-basket relative border border-neutral-200 rounded-xl w-full min-h-64  p-6 px-12 max-[750px]:p-4 flex gap-4 max-[750px]:flex-col">
      <div className="product-card-basket-image w-96 h-full max-[750px]:w-full max-[750px]:max-h-48">
        <img
          src={image}
          alt="basket-product"
          className="product-card-basket-img h-full w-full object-center object-contain"
        />
      </div>
      <div className="product-card-basket-details flex flex-col w-full gap-2 justify-evenly">
        <span className="text-lg text-neutral-700">{title}</span>
        <span className="text-sm text-neutral-600">{description}</span>
        <span className="text-md text-neutral-700">Cena: ${price}</span>
      </div>
      <div className="product-card-basket-quantity absolute bottom-4 right-4 max-[750px]:right-2 max-[750px]:bottom-2">
        <div className="product-description-quantity ml-auto   w-max  flex">
          <button
            onClick={() => handleQuantity("-")}
            className="cursor-pointer px-4 hover:bg-neutral-50 transition duration-300 ease-in-out"
          >
            -
          </button>
          <span className="p-2">{quantity}</span>
          <button
            onClick={() => handleQuantity("+")}
            className=" px-4 cursor-pointer  hover:bg-neutral-50 transition duration-300 ease-in-out"
          >
            +
          </button>
        </div>
      </div>
      <button
        onClick={handleRemoveProduct}
        className="absolute right-4 top-4 h-[20px] w-[20px] flex items-center cursor-pointer"
      >
        <Close fontSize="small" className="h-full w-full" />
      </button>
    </div>
  );
};

export default ProductCardBasket;
