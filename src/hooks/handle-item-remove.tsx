import React from "react";
import { db } from "../auth/firebase";
import { auth } from "../auth/firebase";
import { useSelector } from "react-redux";
import { arrayUnion, doc, getDoc, updateDoc } from "firebase/firestore";
/**
 * Hook that provides functionality to remove item from certain field in firestore
 */

type handleItemRemoveProps = {
  field: "basket" | "wishlist";
  id: number;
};

export const useHandleItemRemove = () => {
  /**
   * @param field -> pole które będzie aktualizowane
   * @param user -> obecnie zalogowany użytkownik którego dane zaktualizuje w firestore
   */
  const { loggedIn } = useSelector((state: any) => state.accountSliceReducer);
  const { status } = loggedIn;

  const user = auth.currentUser;

  const handleItemRemove = async ({ field, id }: handleItemRemoveProps) => {
    if (!user || !status) return;
    const UID = user.uid;
    console.log("dd");

    //Referencja do kolekcji użytkownika
    const docRef = doc(db, "users", UID);
    try {
      const docSnapshot = await getDoc(docRef);
      if (docSnapshot.exists()) {
        const userData = docSnapshot.data();
        const userArrCopy = [...userData[field]];
        const searchedItemIndex = userArrCopy.findIndex(
          (p: any) => p.id === id
        );
        userArrCopy.splice(searchedItemIndex, 1);

        switch (field) {
          case "basket":
            await updateDoc(docRef, {
              basket: userArrCopy,
            });
            return;
          case "wishlist":
            await updateDoc(docRef, {
              wishlist: userArrCopy,
            });
        }
      }
    } catch (err) {
      console.error("Nieudana próba zaktualizowania koszyku");
    }
  };

  return {
    handleItemRemove,
  };
};
