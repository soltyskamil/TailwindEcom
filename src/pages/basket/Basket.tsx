import { useDispatch, useSelector } from "react-redux";
import "./basket.scss";
import { tv } from "tailwind-variants";
import ProductCardBasket from "../../components/basket/basket-product";
import { useHandleBasketTotal } from "../../hooks/handle-basket-total";
import { useToast } from "../../hooks/use-toast";
import { Link, useLocation, useNavigate } from "react-router";
import useHandleGetItems from "../../hooks/handle-get-items";
import { useEffect } from "react";
import { useState } from "react";
import useHandleRealTimeUpdates from "../../hooks/handle-realtime-updates";
import { SvgEmptyBasketIcon } from "../../components/icon/empty-basket-icon";
const Basket = () => {
  const [basket, setBasket] = useState([]);
  const { totalPrice } = useHandleBasketTotal(basket);
  const { basket: basketRedux } = useSelector(
    (state: any) => state.productsSliceReducer
  );
  const { loggedIn } = useSelector((state: any) => state.accountSliceReducer);
  const { status } = loggedIn;
  const { handleGetItems } = useHandleGetItems();
  const { handleRealTimeUpdate } = useHandleRealTimeUpdates({
    setBasket,
  });
  const { pathname } = useLocation();
  const { addToast } = useToast();
  const navigate = useNavigate();
  const details = tv({
    base: "py-4 flex justify-between border-neutral-300 border-b-1 last-of-type:border-none",
  });

  const detailsTitle = tv({
    base: "text-neutral-600",
  });

  const detailsPrice = tv({
    base: "text-neutral-700",
  });

  const handlePurchase = () => {
    if (!status) {
      addToast(
        "ERROR",
        "Zaloguj się",
        "Aby przeprowadzić proces zamówienia musisz się zalogować.",
        "/account",
        pathname,
        { close: "Zamknij", success: "Otwórz panel" }
      );
      return;
    } else {
      navigate("/order");
    }
  };

  useEffect(() => {
    if (!status) {
      setBasket(basketRedux);
    } else {
      const fetchItems = async () => {
        const items = await handleGetItems("basket");
        if (items) {
          setBasket(items);
        }
      };

      handleRealTimeUpdate("basket");
      fetchItems();
    }
  }, [basketRedux]);

  return (
    <div className="basket-wrapper p-20 max-[1024px]:py-8 max-[1024px]:p-8">
      {basket.length === 0 ? (
        <div className="basket-wrapper-overlay text-center p-8 w-full min-h-[75vh] flex flex-col  gap-3 justify-center border bg-neutral-900 bg-blend-multiply bg-[url('assets/hero-images/hero-images1.webp')]">
          <SvgEmptyBasketIcon
            width={124}
            height={124}
            className="basket-icon mx-auto"
          />
          <span className="text-5xl text-white">Twój koszyk jest pusty</span>
          <span className="block text-xl text-white">
            Dodaj produkty, a będą czekały na realizację zamówienia
          </span>
          <Link to={"/"} className="text-xl block w-max text-blue-600 mx-auto">
            Przejdź do strony głównej
          </Link>
        </div>
      ) : (
        <div className="basket grid grid-cols-[2fr_1fr] max-[1024px]:grid-cols-1 min-h-dvh gap-16 mt-10">
          <div className="basket-products border-neutral-300">
            <div className="products-wrapper grid grid-cols-1 gap-2 ">
              {basket.map((product: any, idx: number) => (
                <ProductCardBasket {...product} key={idx} />
              ))}
            </div>
          </div>
          {basket.length > 0 && (
            <div className="basket-checkout p-6  bg-neutral-100 rounded-md h-min">
              <h2 className="basket-checkout-title text-neutral-800 text-xl">
                Podsumowanie zamówienia
              </h2>
              <div className="basket-checkout-details">
                <div
                  className={`basket-checkout-details-subtotal ${details()}`}
                >
                  <span className={detailsTitle()}>Wartość przedmiotów</span>
                  <span className={detailsPrice()}>${totalPrice}</span>
                </div>
                <div
                  className={`basket-checkout-details-delivery ${details()}`}
                >
                  <span className={detailsTitle()}>
                    Przewidywana cena przesyłki
                  </span>
                  <span className={detailsPrice()}>$16.99</span>
                </div>
                <div className={`basket-checkout-details-total ${details()}`}>
                  <span className="text-xl">Cena całkowita</span>
                  <span className="text-xl">
                    ${(totalPrice + 16.99).toFixed(2)}
                  </span>
                </div>
              </div>
              <button
                onClick={handlePurchase}
                className="border p-4 w-full bg-blue-500 hover:bg-blue-600 active:bg-blue-700 tranition duration-300 ease-in-out cursor-pointer text-white rounded-lg font-bold"
              >
                Potwierdź zamówienie
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Basket;
