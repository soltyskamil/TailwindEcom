import React from "react";
import {
  getDocs,
  collection,
  getDoc,
  doc,
  query,
  where,
  updateDoc,
} from "firebase/firestore";
import { db } from "../auth/firebase";
import { auth } from "../auth/firebase";
import { useSelector } from "react-redux";
/**
 * Hook that provides functionality for changing item quantity in firestore
 */
const useHandleItemQuantity = () => {
  /**
   * @param user -> obecnie zalogowany użytkownik którego dane pobieramy z firebase
   * @param operation -> odejmujemy lub dodajemy quantity
   */
  const { loggedIn } = useSelector((state: any) => state.accountSliceReducer);
  const { status } = loggedIn;

  const user = auth.currentUser;
  const handleItemQuantity = async (
    operation: "-" | "+",
    productID: number
  ) => {
    if (!user || !status) return;
    const UID = user.uid;

    try {
      const docRef = doc(db, "users", UID);
      const docSnapshot = await getDoc(docRef);

      if (docSnapshot.exists()) {
        const { basket } = docSnapshot.data();

        const addedQuantity = basket.map((p: any) =>
          p.id === productID ? { ...p, quantity: p.quantity + 1 } : { ...p }
        );
        const removedQuantity = basket.map((p: any) =>
          p.id === productID
            ? { ...p, quantity: p.quantity > 1 ? p.quantity - 1 : p.quantity }
            : { ...p }
        );

        switch (operation) {
          case "-":
            await updateDoc(docRef, {
              basket: removedQuantity,
            });
            return;
          case "+":
            await updateDoc(docRef, {
              basket: addedQuantity,
            });
            return;
        }
      }
    } catch (err) {
      console.error("Wystąpił błąd");
    }
  };

  return {
    handleItemQuantity,
  };
};

export default useHandleItemQuantity;
