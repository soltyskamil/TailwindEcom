import React, { useRef, useEffect } from "react";
import { Formik } from "formik";
import { useToast } from "../../hooks/use-toast";
import LoginIcon from "@mui/icons-material/Login";
import { auth } from "../../auth/firebase";
import { useHandleUserSignup } from "../../hooks/handle-sign-up";
import { useHandleUserSignIn } from "../../hooks/handle-sign-in";
import gsap from "gsap";
import { useLocation } from "react-router";
gsap.registerPlugin(gsap);

const AccountLoggedOut = () => {
  const { state } = useLocation();
  const { from, to } = state || {};
  const { handleSignUp } = useHandleUserSignup({ pathname: from });
  const { handleSignIn } = useHandleUserSignIn({ pathname: from });
  const { addToast } = useToast();

  const observerRef = useRef<IntersectionObserver | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach((entry: any) => {
        if (entry.isIntersecting) {
          gsap.to(entry.target, {
            opacity: 1,
            duration: 1,
          });
          observerRef.current?.unobserve(entry.target);
        }
      });
    });

    observerRef.current.observe(containerRef.current);

    return () => observerRef.current?.disconnect();
  }, [containerRef]);

  return (
    <div className="wrapper">
      <div
        ref={containerRef}
        className="account grid  grid-cols-2 p-20 max-[700px]:p-8 gap-10 max-[700px]:grid-cols-1 max-[700px]:mt-10 opacity-0"
      >
        <div className="account-login p-8 border border-neutral-200 bg-neutral-100 max-h-min">
          <h3 className="text-3xl">Logowanie</h3>
          <Formik
            initialValues={{ email: "", password: "" }}
            validate={(values) => {
              const errors = {} as any;
              if (!values.email) {
                errors.email = "Adres email jest wymagany";
              } else if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
              ) {
                errors.email = "Nieprawidłowy adres email";
              }
              return errors;
            }}
            onSubmit={(values, { setSubmitting, resetForm }) => {
              setTimeout(() => {
                addToast(
                  "DEFAULT",
                  "Pomyslnie zalogowano",
                  `Witamy ponownie ${values.email}`
                );
                handleSignIn(auth, values.email, values.password);
                resetForm();
                setSubmitting(false);
              }, 400);
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
            }) => (
              <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-2 mt-4"
              >
                <input
                  type="email"
                  name="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  className="border outline-0 p-2"
                  placeholder="Email"
                />
                <span className="text-red-500">
                  {errors.email && touched.email && errors.email}
                </span>
                <input
                  type="password"
                  name="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  className="border outline-0 p-2"
                  placeholder="Hasło"
                />{" "}
                <span className="text-red-500">
                  {errors.password && touched.password && errors.password}
                </span>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="border w-max p-2 bg-black text-white flex gap-2 items-center cursor-pointer"
                >
                  <LoginIcon fontSize="small" />
                  Zaloguj
                </button>
              </form>
            )}
          </Formik>
        </div>
        <div className="account-register p-8 border border-neutral-200 bg-neutral-100">
          <h3 className="text-3xl">Rejestracja</h3>
          <Formik
            initialValues={{
              email: "",
              name: "",
              surname: "",
              password: "",
              confirm: "",
            }}
            validate={(values) => {
              const errors = {} as any;
              if (!values.email) {
                errors.email = "Adres email jest wymagany";
              }
              if (!values.name) {
                errors.name = "Imię jest wymagane";
              }
              if (!values.surname) {
                errors.surname = "Nazwisko jest wymagane";
              } else if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
              ) {
                errors.email = "Nieprawidłowy adres email";
              } else if (values.password !== values.confirm) {
                errors.confirm = "Hasło różni się";
              }

              return errors;
            }}
            onSubmit={(values, { setSubmitting, resetForm }) => {
              setTimeout(() => {
                handleSignUp(
                  auth,
                  values.email,
                  values.name,
                  values.surname,
                  values.password
                );
                setSubmitting(false);
                resetForm();
              }, 400);
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
            }) => (
              <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-2 mt-4"
              >
                <input
                  type="email"
                  name="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  className="border outline-0 p-2"
                  placeholder="Email"
                />
                <span className="text-red-500">
                  {errors.email && touched.email && errors.email}
                </span>
                <input
                  type="text"
                  name="name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.name}
                  className="border outline-0 p-2"
                  placeholder="Imię"
                />
                <span className="text-red-500">
                  {errors.name && touched.name && errors.name}
                </span>
                <input
                  type="text"
                  name="surname"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.surname}
                  className="border outline-0 p-2"
                  placeholder="Nazwisko"
                />
                <span className="text-red-500">
                  {errors.surname && touched.surname && errors.surname}
                </span>
                <input
                  type="password"
                  name="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  className="border outline-0 p-2"
                  placeholder="Hasło"
                />{" "}
                <span className="text-red-500">
                  {errors.password && touched.password && errors.password}
                </span>
                <input
                  type="password"
                  name="confirm"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.confirm}
                  className="border outline-0 p-2"
                  placeholder="Potwierdź hasło"
                />{" "}
                <span className="text-red-500">
                  {errors.confirm && touched.confirm && errors.confirm}
                </span>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="border w-max p-2 bg-black text-white flex gap-2 items-center cursor-pointer"
                >
                  <LoginIcon fontSize="small" />
                  Stwórz konto
                </button>
              </form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default AccountLoggedOut;
