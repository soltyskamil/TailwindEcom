import React, { type Dispatch, type SetStateAction } from "react";
import { getDoc, doc, onSnapshot } from "firebase/firestore";
import { db } from "../auth/firebase";
import { auth } from "../auth/firebase";
import { useSelector } from "react-redux";

/**
 *
 * @returns real time update from firestore database
 */

type useHandleRealTimeUpdatesProps = {
  setBasket?: Dispatch<SetStateAction<never[]>>;
  setWishlist?: Dispatch<SetStateAction<never[]>>;
};
const useHandleRealTimeUpdates = ({
  setBasket,
  setWishlist,
}: useHandleRealTimeUpdatesProps) => {
  /**
   * @param user -> obecnie zalogowany użytkownik którego dane pobieramy z firebase
   * @param field -> pole które mamy pobrać
   */
  const { loggedIn } = useSelector((state: any) => state.accountSliceReducer);
  const { status } = loggedIn;

  const user = auth.currentUser;

  const handleRealTimeUpdate = (field: "basket" | "wishlist") => {
    if (!user || !status) return;
    const UID = user.uid;
    const docRef = doc(db, "users", UID);

    switch (field) {
      case "basket":
        if (!setBasket) return;
        onSnapshot(docRef, (docRef) => {
          if (docRef.exists()) {
            const basket = docRef.data().basket;
            setBasket(basket);
          }
        });
        return;
      case "wishlist":
        onSnapshot(docRef, (docRef) => {
          if (!setWishlist) return;
          if (docRef.exists()) {
            const wishlist = docRef.data().wishlist;
            setWishlist(wishlist);
          }
        });
    }
  };

  return {
    handleRealTimeUpdate,
  };
};

export default useHandleRealTimeUpdates;
