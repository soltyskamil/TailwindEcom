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
/**
 * Hook that provides receiving data from firestore database
 */
const useHandleGetItems = () => {
  /**
   * @param user -> obecnie zalogowany użytkownik którego dane pobieramy z firebase
   * @param field -> pole które mamy pobrać
   */

  const user = auth.currentUser;

  const handleGetItems = async (field: "basket" | "wishlist" | "orders") => {
    if (!user) return;
    const UID = user.uid;
    const docRef = doc(db, "users", UID);

    try {
      const docSnapshot = await getDoc(docRef);

      if (docSnapshot.exists()) {
        const userData = docSnapshot.data();
        const arr = userData[field];
        return arr;
      } else {
        console.error("Nie ma takiego dokumentu..");
      }
    } catch (error) {
      console.error("Wystąpił błąd podczas pobierania danych");
    }
  };

  return {
    handleGetItems,
  };
};

export default useHandleGetItems;
