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
interface ProductOrderProps extends ProductCardData {
  timeStamp: any;
}
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
  timeStamp,
}: ProductOrderProps) => {
  return (
    <div className="product-order my-4 p-4 flex max-[800px]:flex-col gap-4 bg-white border border-neutral-300 rounded-md">
      <div className="product-order-image h-44 shadow-xl rounded-md min-w-44 max-[400px]:min-w-1  max-[400px]:w-full max-[400px]:max-w-44 p-2 bg-white max-[800px]:w-max">
        <img
          src={image}
          alt="product-order-image"
          className="h-full max-w-44 w-full object-contain bg-white"
        />
      </div>
      <div className="product-order-details flex flex-col justify-evenly">
        <div className="product-order-title-price-quantity grid grid-cols-[1fr_auto_auto] gap-2 max-[600px]:grid-cols-1 max-[600px]:grid-rows-[auto_auto_auto] max-[600px]:gap-0.5">
          <span className="font-bold">{title}</span>
          <span className="font-bold">Cena: {price}</span>
          <span className="font-bold">Ilość: {quantity}</span>
        </div>
        <div className="product-order-description">
          <span className="text-neutral-600">{description}</span>
        </div>
      </div>
    </div>
  );
};

export default ProductOrder;
