import React from "react";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "../auth/firebase";
import { auth } from "../auth/firebase";
import { useDispatch, useSelector } from "react-redux";
import { addToBasket, clearBasket } from "../store/products-reducer";
const useHandleUpdateItems = () => {
  /**
   * @param user -> obecnie zalogowany użytkownik którego pobieramy z firebase
   * @param field -> pole które mamy zaktualizować
   */

  const user = auth.currentUser;
  const dispatch = useDispatch();
  const { basket } = useSelector((state: any) => state.productsSliceReducer);
  const { loggedIn } = useSelector((state: any) => state.accountSliceReducer);
  const { status } = loggedIn;

  const handleUpdateItems = async (
    field: "basket" | "wishlist" | "orders" | "basket-clear",
    item: any
  ) => {
    if (!user) return;
    const UID = user.uid;
    const docRef = doc(db, "users", UID);

    try {
      switch (field) {
        case "basket":
          if (!status) {
            dispatch(addToBasket(item));
          } else
            await updateDoc(docRef, {
              basket: arrayUnion(item),
            });
          return;
        case "basket-clear":
          await updateDoc(docRef, {
            basket: [],
          });
          return;
        case "wishlist":
          await updateDoc(docRef, {
            wishlist: arrayUnion(item),
          });
          return;
        case "orders":
          await updateDoc(docRef, {
            orders: arrayUnion(item),
          });
          return;
      }
    } catch (error) {
      console.error("Wystąpił błąd podczas aktualizowania danych");
    }
  };

  return {
    handleUpdateItems,
  };
};

export default useHandleUpdateItems;
