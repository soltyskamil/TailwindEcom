import React, { use, useEffect, type RefObject } from "react";
import { useLocation } from "react-router";
import DeleteIcon from "@mui/icons-material/Delete";
import StarIcon from "@mui/icons-material/Star";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { useDispatch, useSelector } from "react-redux";
import { addToBasket, removeFromBasket } from "../../store/products-reducer";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
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

const ProductCard = ({
  image,
  category,
  discount,
  title,
  price,
  rating,
  id,
  description,
  ref,
}: ProductCardData) => {
  const dispatch = useDispatch();
  const { basket } = useSelector((state: any) => state.productsSliceReducer);
  const { pathname } = useLocation();
  const inBasket = pathname === "/basket";

  const handleAddProduct = () => {
    dispatch(
      addToBasket({ id, title, price, description, category, image, rating })
    );
  };

  const handleRemoveProduct = () => {
    console.log("ee");
    dispatch(removeFromBasket({ id }));
  };

  return (
    <div
      ref={ref}
      className={`${
        inBasket && "opacity-0"
      }   rounded-xl min-w-84  border-2 p-4 h-96 shadow-2xl flex flex-col`}
    >
      <div className="img-container flex-1 relative overflow-hidden rounded-2xl">
        {discount && (
          <span className="discount z-20 font-bold text-sm absolute left-2 top-2  px-2 bg-black text-white rounded-2xl">
            {discount + "%"} OFF
          </span>
        )}
        <img
          src={image}
          alt="product_img"
          className="rounded-xl w-full transition duration-300 ease-in-out  z-10 max-h-[150px] h-full block object-contain hover:scale-125"
        />
      </div>
      <div className="product-description">
        <span className="product-title block my-4 min-h-[56px] px-2 text-xl text-neutral-800">
          {title}
        </span>
        <div className="product-description-price flex flex-wrap px-2  justify-between">
          <span className="font-bold text-3xl max-[350px]:flex max-[350px]:flex-col">
            {"$" + price.toFixed(1)}
            {discount && (
              <span className="price-before-discount text-sm font-light line-through ml-1">
                ${price}
              </span>
            )}
          </span>
          <div className="product-description-price-rating ml-2 flex items-center">
            {Array.from({ length: Math.round(rating.rate) }).map(
              (star: any, idx: number) => (
                <StarIcon
                  color="warning"
                  fontSize="small"
                  key={`filled-${idx}`}
                />
              )
            )}
            {Array.from({ length: 5 - Math.round(rating.rate) }).map(
              (emptyStar: any, idx: number) => (
                <StarBorderIcon
                  color="warning"
                  fontSize="small"
                  key={`empty-${idx}`}
                />
              )
            )}
            <span
              className="text-sm font-bold  px-2 rounded-sm ml-2"
              style={{ backgroundColor: "#ed6c02" }}
            >
              {rating.rate}
            </span>
          </div>
        </div>
        {inBasket ? (
          <div className="basket-buttons flex flex-wrap">
            <button className="cta border flex-1 h-auto cursor-pointer hover:bg-neutral-900 active:bg-neutral-950 transition duration-300 ease-in-out text-md w-full py-3 flex items-center justify-center gap-2 px-4 mt-4 rounded-md bg-neutral-800 text-white font-bold">
              <CreditCardIcon fontSize="medium" />
              Złóż zamówienie
            </button>
            <button
              onClick={handleRemoveProduct}
              className="cta border cursor-pointer flex-1 h-auto hover:bg-red-600 active:bg-red-700 transition duration-300 ease-in-out text-md w-full py-3 flex items-center justify-center gap-2 px-4 mt-4 rounded-md bg-red-500 text-white font-bold"
            >
              <DeleteIcon fontSize="medium" />
              Usuń z koszyka
            </button>
          </div>
        ) : (
          <button
            onClick={handleAddProduct}
            className="cta border cursor-pointer hover:bg-neutral-900 active:bg-neutral-950 transition duration-300 ease-in-out text-md w-full py-3 flex items-center justify-center gap-2 px-4 mt-4 rounded-md bg-neutral-800 text-white font-bold"
          >
            <AddShoppingCartIcon fontSize="medium" />
            Dodaj do koszyka
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
