/**
 * Hook that provides signUp functionality
 */

import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { db } from "../auth/firebase";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { useToast } from "./use-toast";
import { setLoggedIn } from "../store/account-reducer";
type useHandleUserSignup = {
  pathname?: string;
};

export const useHandleUserSignup = ({ pathname }: useHandleUserSignup = {}) => {
  /**
   *  @param auth[string] - dla autentykacji apki
   * @param login[string] - login użytkownika
   * @param name[string] - imię użytkownika
   * @param surname[string] - nazwisko użytkownika
   * @param password[string] - hasło użytkownika
   */

  const { addToast } = useToast();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignUp = async (
    auth: any,
    login: string,
    name: string,
    surname: string,
    password: string
  ) => {
    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        login,
        password
      );

      const userID = result.user.uid;
      await setDoc(doc(db, "users", userID), {
        login: login,
        name: name,
        surname: surname,
        password: password,
        orders: [],
        basket: [],
        wishlist: [],
      }).then(() => {
        dispatch(setLoggedIn({ login, name, surname }));
        if (pathname) {
          navigate(pathname);
        } else navigate("/");
      });

      addToast(
        "DEFAULT",
        "Pomyślnie zarejestrowano",
        `Witaj ${name}, życzymy miłego korzystania ze sklepu`
      );
    } catch (error: any) {
      addToast("ERROR", "Wystąpił błąd!", error.message);
    }
  };

  return {
    handleSignUp,
  };
};
