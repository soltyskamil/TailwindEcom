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
    base: "text-[#374151] text-md block max-[850px]:text-sm",
  });

  return (
    <div className="account-settings p-8 max-[800px]:p-4">
      <h2 className="text-2xl font-bold mb-8">Zmień swoje hasło</h2>
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
          <form onSubmit={handleSubmit} className="flex flex-col gap-0.5">
            <label htmlFor="email" className={label()}>
              Twój adres email
            </label>
            <input
              type="email"
              name="email"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
              className={`${input()} outline-blue-700`}
              placeholder="example@gmail.com"
            />
            <span className="text-red-500">
              {touched.email && errors.email}
            </span>
            <label htmlFor="currentPassword" className={label()}>
              Twoje obecne hasło
            </label>

            <input
              type="password"
              name="currentPassword"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.currentPassword}
              className={`${input()} outline-blue-700`}
              placeholder="password..."
            />
            <span className="text-red-500">
              {touched.currentPassword && errors.currentPassword}
            </span>
            <label htmlFor="newPassword" className={label()}>
              Nowe hasło
            </label>

            <input
              type="password"
              name="newPassword"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.newPassword}
              className={`${input()} outline-blue-700`}
              placeholder="new password..."
            />
            <span className="text-red-500">
              {touched.newPassword && errors.newPassword}
            </span>
            <label htmlFor="newPasswordConfirm" className={label()}>
              Potwierdź nowe hasło
            </label>

            <input
              type="password"
              name="newPasswordConfirm"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.newPasswordConfirm}
              className={`${input()} outline-blue-700`}
              placeholder="new password.."
            />
            <span className="text-red-500">
              {touched.newPasswordConfirm && errors.newPasswordConfirm}
            </span>
            <button
              type="submit"
              className="p-2 bg-blue-700 hover:bg-blue-800 active:bg-blue-900 transition duration-300 ease-in-out mt-2 rounded-md  text-white shadow-md cursor-pointer w-max max-[1024px]:w-full"
              disabled={isSubmitting}
            >
              Potwierdź zmianę hasła
            </button>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default AccountSettings;
