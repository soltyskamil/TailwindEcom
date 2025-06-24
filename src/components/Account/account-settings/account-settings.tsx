import React from "react";
import { store } from "../../../store/main-store";
import useHandleChangeUserPassword from "../../../hooks/handle-change-password";
import { Formik } from "formik";
import type { AuthCredential } from "firebase/auth";
import { tv } from "tailwind-variants";
const AccountSettings = () => {
  const { loggedIn } = store.getState().accountSliceReducer;
  const { login, name, surname } = loggedIn;
  const { handleChangePassword } = useHandleChangeUserPassword();

  const input = tv({
    base: "border border-[#D1D5DB] p-2 rounded-md w-full max-[850px]:text-sm ",
  });

  const label = tv({
    base: "text-[#374151] text-md block mb-1 max-[850px]:text-sm",
  });

  return (
    <div className="account-settings">
      <Formik
        initialValues={{
          email: "",
          currentPassword: "",
          newPassword: "",
          newPasswordConfirm: "",
        }}
        validate={(values) => {
          const errors = {} as any;

          for (const [key, value] of Object.entries(values)) {
            if (!value) {
              errors[key] = "Uzupełnij pole";
            }
          }

          if (values.newPassword !== values.newPasswordConfirm) {
            errors.newPassword = "Hasła różnią się";
            errors.newPasswordConfirm = "Hasła różnią się";
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = "Nieprawidłowy adres email";
          }
          return errors;
        }}
        onSubmit={(values) => {
          console.log("Zmiana hasła...");
          handleChangePassword(
            values.currentPassword as any,
            values.newPassword as any
          );
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          /* and other goodies */
        }) => (
          <form onSubmit={handleSubmit} className="flex flex-col gap-2 p-4">
            <input
              type="email"
              name="email"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
              className={input()}
              placeholder="przykład@gmail.com"
            />
            <span className="text-red-500">
              {touched.email && errors.email}
            </span>
            <input
              type="password"
              name="currentPassword"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.currentPassword}
              className={input()}
              placeholder="Obecne hasło"
            />
            <span className="text-red-500">
              {touched.currentPassword && errors.currentPassword}
            </span>
            <input
              type="password"
              name="newPassword"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.newPassword}
              className={input()}
              placeholder="Nowe hasło"
            />
            <span className="text-red-500">
              {touched.newPassword && errors.newPassword}
            </span>
            <input
              type="password"
              name="newPasswordConfirm"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.newPasswordConfirm}
              className={input()}
              placeholder="Potwierdź nowe hasło.."
            />
            <span className="text-red-500">
              {touched.newPasswordConfirm && errors.newPasswordConfirm}
            </span>
            <button
              type="submit"
              className="border p-2 bg-blue-400 rounded-md outline-0  text-white shadow-md cursor-pointer"
              disabled={isSubmitting}
            >
              Submit
            </button>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default AccountSettings;
