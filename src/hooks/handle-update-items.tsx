import React from "react";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "../auth/firebase";
import { auth } from "../auth/firebase";

const useHandleUpdateItems = () => {
  /**
   * @param user -> obecnie zalogowany użytkownik którego pobieramy z firebase
   * @param field -> pole które mamy zaktualizować
   */

  const user = auth.currentUser;

  const handleUpdateItems = async (
    field: "basket" | "wishlist" | "orders",
    item: any
  ) => {
    if (!user) return;
    const UID = user.uid;
    const docRef = doc(db, "users", UID);

    try {
      switch (field) {
        case "basket":
          await updateDoc(docRef, {
            basket: arrayUnion(item),
          });
          return;
        case "wishlist":
          await updateDoc(docRef, {
            wishlist: arrayUnion(item),
          });
          return;
        case "orders":
          await updateDoc(docRef, {
            orders: arrayUnion(...item),
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
