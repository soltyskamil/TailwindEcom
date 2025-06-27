/**
 * Hook that provides signUp functionality
 */

import { signInWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setLoggedIn } from "../store/account-reducer";
import { useNavigate } from "react-router";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../auth/firebase";
import { useLocation } from "react-router";

type useHandleUserSignInProps = {
  pathname?: string;
};

export const useHandleUserSignIn = ({
  pathname,
}: useHandleUserSignInProps = {}) => {
  /**
   *  @param auth[string] - dla autentykacji apki
   * @param login[string] - login użytkownika
   * @param password[string] - hasło użytkownika
   * @param name[string] - imię użytkownika pobierane z firestore
   * @param surname[string] - nazwisko użytkownika pobierane z firestore
   */

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignIn = async (auth: any, login: string, password: string) => {
    try {
      const result = await signInWithEmailAndPassword(auth, login, password);

      if (result) {
        const userID = result.user.uid;

        // Fetching user data from database
        const user = await getDoc(doc(db, "users", userID));
        if (user.exists()) {
          const { name, surname } = user.data();
          if (pathname) {
            navigate(pathname);
          } else navigate("/");
          const promise = new Promise((resolve, _) => {
            setTimeout(() => {
              resolve("switched");
            }, 300);
          });

          promise.then(() => {
            dispatch(setLoggedIn({ login, name: name, surname: surname }));
          });
        } else {
          toast("Wystąpił błąd podczas logowania");
        }
      }
    } catch (error) {
      toast("Wystąpił błąd podczas logowania");
      console.error("Wystąpił błąd podczas rejestracji...");
    }
  };

  return {
    handleSignIn,
  };
};
