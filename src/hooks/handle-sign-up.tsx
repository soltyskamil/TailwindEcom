/**
 * Hook that provides signUp functionality
 */

import { createUserWithEmailAndPassword } from "firebase/auth";

import { setDoc, doc } from "firebase/firestore";
import { db } from "../auth/firebase";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { setLoggedIn } from "../store/account-reducer";
export const useHandleUserSignup = () => {
  /**
   *  @param auth[string] - dla autentykacji apki
   * @param login[string] - login użytkownika
   * @param name[string] - imię użytkownika
   * @param surname[string] - nazwisko użytkownika
   * @param password[string] - hasło użytkownika
   */

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

      if (result) {
        try {
          const userID = result.user.uid;

          //Setting userdata to firestore
          await setDoc(doc(db, "users", userID), {
            login: login,
            name: name,
            surname: surname,
          });

          toast("Użytkownik został zarejestrowany");
          navigate("/");
          const promise = new Promise((resolve) => {
            setTimeout(() => {
              resolve("switched");
            }, 300);
          });

          //Setting logged state after switching to homepage
          promise.then(() => {
            dispatch(setLoggedIn({ login, name, surname }));
          });
        } catch (error) {
          toast("Wystąpił błąd podczas dodawania do bazy danych");
        }
      }
    } catch (error: any) {
      toast(`Wystąpił błąd podczas rejestracji ${error}`);
      console.error("Wystąpił błąd podczas rejestracji...");
    }
  };

  return {
    handleSignUp,
  };
};
