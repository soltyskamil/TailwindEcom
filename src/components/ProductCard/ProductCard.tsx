import React, { useRef } from "react";
import { data, useLocation, useNavigate } from "react-router";
import {
  SLOW_DURATION,
  FAST_DURATION,
} from "../../hooks/handle-carousel-animation";
import { motion } from "framer-motion";
import DeleteIcon from "@mui/icons-material/Delete";
import StarIcon from "@mui/icons-material/Star";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "../../hooks/use-toast";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import {
  addToBasket,
  changeProductQuantity,
  removeFromBasket,
  addToWishlist,
} from "../../store/products-reducer";
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
  setMustFinish: (finish: boolean) => void;
  setDuration: (duration: number) => void;
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

  setMustFinish,
  setDuration,
}: ProductCardData) => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const { loggedIn } = useSelector((state: any) => state.accountSliceReducer);
  const { status } = loggedIn;

  const inHome = pathname === "/";
  const inBasket = pathname === "/basket";
  const inSummary = pathname === "/order";
  const productsState = useSelector((state: any) => state.productsSliceReducer);
  const { addToast } = useToast();
  const favoriteRef = useRef<HTMLButtonElement | null>(null);

  const currentProduct = productsState.basket.find(
    (product: any) => product.id === id
  );

  const quantity = currentProduct?.quantity;

  const handleAddProduct = (action: "basket" | "wishlist") => {
    switch (action) {
      case "basket":
        dispatch(
          addToBasket({
            id,
            title,
            price,
            description,
            category,
            image,
            rating,
          })
        );
        return;
      case "wishlist":
        if (!status) {
          addToast(
            "ERROR",
            "Zaloguj się",
            "Aby dodać przedmiot do wishlisty musisz się zalogować",
            "/account",
            { close: "Zamknij", success: "Otwórz panel" }
          );
        } else {
          addToast(
            "DEFAULT",
            "Dodano przedmiot do listy życzeń",
            title,
            "/account/wishlist",
            { close: "Zamknij", success: "Otwórz wishlistę" }
          );
          dispatch(
            addToWishlist({
              id,
              title,
              price,
              description,
              category,
              image,
              rating,
            })
          );
        }
    }
  };

  const handleHover = (duration: number) => {
    setMustFinish?.(true); // bezpieczne wywołanie
    setDuration?.(duration);
  };

  return (
    <div className="wrapper flex-[0_0_25%] max-[1440px]:flex-[0_0_33.3%] max-[540px]:flex-[0_0_100%]  max-[840px]:flex-[0_0_50%] min-h-74 px-2 max-[540px]:px-4">
      <motion.div
        onHoverStart={() => {
          handleHover(SLOW_DURATION);
          favoriteRef.current?.classList.add(
            "opacity-100",
            "pointer-events-auto"
          );
        }}
        onHoverEnd={() => {
          handleHover(FAST_DURATION);
          favoriteRef.current?.classList.remove(
            "opacity-100",
            "pointer-event-auto"
          );
        }}
        ref={ref}
        className={`
           rounded-xl relative shadow-2xl hover:shadow-3xl max-[1024px]:my-8 border  ${
             !inBasket && `my-20`
           }
           
           border-neutral-200 hover:border-neutral-400 transition duration-300 ease-in-out  p-4  max-h-72 max-[320px]:max-h-full h-full flex flex-col`}
      >
        <div className="img-container flex gap-2 w-full justify-between flex-row-reverse relative  overflow-hidden ">
          <div className="discount-wrapper flex-1 text-right">
            {discount && (
              <span className="discount z-20 h-max font-bold text-sm absolute left-2 top-2  px-2 bg-black text-white rounded-2xl">
                {discount + "%"} OFF
              </span>
            )}
            <span className="product-title max-w-3/4 text-md text-neutral-800">
              {title}
            </span>
          </div>
          <img
            src={image}
            alt="product_img"
            draggable="false"
            className="rounded-xl object-top block z-10  max-w-[100px]   object-contain pointer-none dragga"
          />
        </div>
        <div className="product-description mt-auto">
          <div className="product-description-price flex flex-wrap px-1  justify-between">
            <span className="font-bold text-3xl max-[350px]:flex max-[350px]:flex-col">
              ${inBasket ? (price * quantity).toFixed(1) : price.toFixed(1)}
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
          {inHome && (
            <button
              onClick={() => {
                handleAddProduct("basket");
                addToast(
                  "DEFAULT",
                  "Dodano przedmiot do koszyka",
                  title,
                  "/basket",
                  { close: "Zamknij", success: "Otwórz koszyk" }
                );
              }}
              className="cta border cursor-pointer hover:bg-neutral-900 active:bg-neutral-950 transition duration-300 ease-in-out text-md w-full py-3 flex items-center justify-center gap-2 px-4 mt-4 rounded-md bg-neutral-800 text-white font-bold"
            >
              <AddShoppingCartIcon fontSize="medium" />
              Dodaj do koszyka
            </button>
          )}
          {/* {inBasket ? (
            <div className="basket-buttons flex flex-wrap">
              <button
                onClick={handlePurchase}
                className="cta border flex-1 h-auto cursor-pointer hover:bg-neutral-900 active:bg-neutral-950 transition duration-300 ease-in-out text-md w-full py-3 flex items-center justify-center gap-2 px-4 mt-4 rounded-md bg-neutral-800 text-white font-bold"
              >
                <CreditCardIcon fontSize="medium" />
                Zamów
              </button>
              <button
                onClick={handleRemoveProduct}
                className="cta border cursor-pointer flex-1 h-auto hover:bg-red-600 active:bg-red-700 transition duration-300 ease-in-out text-md w-full py-3 flex items-center justify-center gap-2 px-4 mt-4 rounded-md bg-red-500 text-white font-bold"
              >
                <DeleteIcon fontSize="medium" />
                Usuń
              </button>
            </div>
          ) : (
            <button
              onClick={() => {
                handleAddProduct("basket");
                addToast("DEFAULT", "Dodano przedmiot do koszyka", title);
              }}
              className="cta border cursor-pointer hover:bg-neutral-900 active:bg-neutral-950 transition duration-300 ease-in-out text-md w-full py-3 flex items-center justify-center gap-2 px-4 mt-4 rounded-md bg-neutral-800 text-white font-bold"
            >
              <AddShoppingCartIcon fontSize="medium" />
              Dodaj do koszyka
            </button>
          )} */}
        </div>
        <button
          className={`cta-favorite absolute bg-red-500 hover:bg-red-600 cursor-pointer p-1 rounded-md right-5 bottom-30 opacity-0 transition duration-300 ease-in-out
              ${pathname === "/" ? "block" : "hidden"}
            `}
          ref={favoriteRef}
          onClick={() => handleAddProduct("wishlist")}
        >
          <FavoriteBorderOutlinedIcon
            fontSize="large"
            className="text-neutral-100  transition duration-300 ease-in-out"
          />
        </button>
      </motion.div>
    </div>
  );
};

export default ProductCard;
