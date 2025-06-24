import React from "react";
import {
  AuthCredential,
  updatePassword,
  EmailAuthProvider,
} from "firebase/auth";
import { auth } from "../auth/firebase";
import { reauthenticateWithCredential } from "firebase/auth";
/**
 * Hook that provides ability to change password by the user
 */

const useHandleChangeUserPassword = () => {
  /**
   * @param user -> obecnie zalogowany użytkownik którego pobieramy z firebase
   * @param currentPassword[string] -> obecne hasło użytkownika, będziemy używać w celu weryfikacji
   * @param newPassword[string] -> nowe hasło uzytkownika
   */

  const user = auth.currentUser;
  const handleChangePassword = async (
    currentPassword: string,
    newPassword: string
  ) => {
    if (!user || !user.email) return;
    try {
      const credential = EmailAuthProvider.credential(
        user.email,
        currentPassword
      );

      await reauthenticateWithCredential(user, credential);

      await updatePassword(user, newPassword);
    } catch (err) {
      console.error(err, "błąd");
    }
  };

  return {
    handleChangePassword,
  };
};

export default useHandleChangeUserPassword;
