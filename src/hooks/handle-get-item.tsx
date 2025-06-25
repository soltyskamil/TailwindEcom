import React from "react";

import {
  getDocs,
  collection,
  getDoc,
  doc,
  query,
  where,
} from "firebase/firestore";
import { db } from "../auth/firebase";
import { auth } from "../auth/firebase";
import { useSelector } from "react-redux";
/**
 * Hook that provides fetching single item from firestore
 */
export const useHandleGetItem = () => {
  /**
   * @param user -> obecnie zalogowany użytkownik którego dane pobieramy z firebase
   * @param field -> pole które mamy pobrać
   */
  const { loggedIn } = useSelector((state: any) => state.accountSliceReducer);
  const { status } = loggedIn;

  const user = auth.currentUser;

  const handleGetItem = async () => {
    if (!user || !status) return;
    const UID = user.uid;

    try {
      console.log(UID);
      const docRef = doc(db, "users", UID);

      const basketRef = collection(docRef, "basket");
      const snapshot = await getDocs(basketRef);

      const docSnapshot = await getDoc(docRef);
      if (docSnapshot.exists()) {
        const { basket } = docSnapshot.data();
        const updatedBasket = basket.map((p: any) =>
          p.id === 3 ? { ...p, quantity: p.quantity + 1 } : { ...p }
        );

        console.log(updatedBasket);
      }
    } catch (error) {
      console.error("Pełny błąd:", error);
    }
  };

  return {
    handleGetItem,
  };
};
