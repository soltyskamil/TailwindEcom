import React, { useEffect, useRef } from "react";
import type { ProductCardData } from "../../basket/basket-product";
import { motion } from "framer-motion";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { Delete } from "@mui/icons-material";
import useHandleUpdateItems from "../../../hooks/handle-update-items";
import { useHandleItemRemove } from "../../../hooks/handle-item-remove";
import { useToast } from "../../../hooks/use-toast";

const WishlistProduct = ({
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
  const { handleItemRemove } = useHandleItemRemove();
  const { handleUpdateItems } = useHandleUpdateItems();
  const { addToast } = useToast();
  const props = {
    id,
    title,
    price,
    description,
    category,
    image,
    rating,
  };

  return (
    <div className="wishlist-product w-full relative h-auto hover:border-neutral-400 hover:bg-neutral-100 transition duration-300 ease-in flex p-4 max-[750px]:flex-col  gap-2 border bg-neutral-50 border-neutral-300 rounded-md">
      <div className="wishlist-product-name max-h-24  flex  gap-2 max-w-1/2 w-full max-[750px]:max-w-full max-[350px]:flex-col max-[350px]:max-h-50">
        <img
          src={image}
          className="h-24 bg-white rounded-md min-w-24 object-contain p-2 shadow-xl"
          alt="wishlist-product-image"
        />
        <div className="wishlist-product-name-wrapper flex flex-col w-full ">
          <span className="font-bold">Nazwa produktu:</span>
          <span className="my-auto">{title}</span>
        </div>
      </div>
      <div className="wishlist-product-price min-w-[56px]">
        <div className="wishlist-product-price-wrapper flex flex-col h-full w-full ">
          <span className="font-bold">Cena:</span>
          <span className="my-auto text-xl font-bold">${price}</span>
        </div>
      </div>
      <div className="wishlist-product-stock mx-auto max-[750px]:mx-0">
        <div className="wishlist-product-stock-wrapper flex  flex-col h-full w-full ">
          <span className="font-bold">Status:</span>
          <span className="my-auto bg-green-200 w-max px-2 py-1 border-green-600 rounded-full text-green-600">
            Dostępny
          </span>
        </div>
      </div>
      <div className="wishlist-product-action">
        <div className="wishlist-product-action-wrapper flex flex-col h-full w-full ">
          <span className="font-bold">Akcje:</span>
          <button
            onClick={() => {
              handleUpdateItems("basket", { ...props, quantity: 1 });
              addToast(
                "DEFAULT",
                "Dodano przedmiot",
                `${title} został pomyślnie dodany do koszyka`,
                "/basket",
                { success: "Otwórz koszyk", close: "Zamknij" }
              );
            }}
            className="my-auto text-left cursor-pointer border px-2 py-1 max-[750px]:w-max rounded-md bg-blue-400 hover:bg-blue-500 active:bg-blue-600 transition duration-300 ease-in-out text-white"
          >
            Dodaj do koszyka
          </button>
        </div>
      </div>
      <div className="wishlist-product-remove absolute top-4 right-4">
        <button
          onClick={() => {
            addToast(
              "ERROR",
              "Usunięto przedmiot",
              `${title} został usunięty z twojej listy życzeń`
            );
            handleItemRemove({ field: "wishlist", id: id });
          }}
          className="cursor-pointer transition duration-300"
        >
          <Delete className="text-neutral-200 transition duration-300 ease-in-out hover:text-neutral-300 active:text-neutral-400" />
        </button>
      </div>
    </div>
  );
};

export default WishlistProduct;
