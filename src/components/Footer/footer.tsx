import React from "react";
import InstagramIcon from "@mui/icons-material/Instagram";
import XIcon from "@mui/icons-material/X";
import FacebookIcon from "@mui/icons-material/Facebook";
import PinterestIcon from "@mui/icons-material/Pinterest";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { Formik, Form } from "formik";
import { tv } from "tailwind-variants";
import logo from "../../assets/logo.svg";
import { Link } from "react-router";
const Footer = () => {
  const listVariant = tv({
    base: "ml-auto mt-4 flex flex-col gap-2 [&>li]:hover:underline underline-offset-2 max-[800px]:ml-0",
  });

  const titleVariant = tv({
    base: "text-xl font-bold text-neutral-800 ",
  });
  return (
    //Dodaj maxwidth
    <footer className="bg-neutral-50  border-t-1 border-neutral-300 p-12 min-h-64 max-[450px]:p-4">
      <div className="footer-links pb-12 border-b-1 border-neutral-300 grid grid-cols-[auto_1fr_1fr_1fr_1fr] max-[800px]:grid-cols-2 max-[425px]:grid-cols-1">
        <img src={logo} alt="logo" className="max-[1300px]:w-48" />
        <div className="hidden max-[800px]:block">&nbsp;</div>
        <ul className={`footer-list 2 ${listVariant()}`}>
          <span className={`${titleVariant()}`}>Rozwiązania</span>
          <li>
            <Link to={"/"}> Strona główna</Link>
          </li>
          <li>
            <Link to={"/"}> Sklep</Link>
          </li>
          <li>
            <Link to={"/"}> Blog</Link>
          </li>
          <li>
            <Link to={"/"}> O nas</Link>
          </li>
          <li>
            <Link to={"/"}> Kontakt</Link>
          </li>
        </ul>
        <ul className={`footer-list ${listVariant()}`}>
          <span className={titleVariant()}>Pomoc</span>
          <li>
            <Link to={"/"}> FAQ</Link>
          </li>
          <li>
            <Link to={"/"}> Regulamin</Link>
          </li>
          <li>
            <Link to={"/"}> Zwroty i reklamacje</Link>
          </li>
        </ul>
        <ul className={`footer-list ${listVariant()}`}>
          <span className={titleVariant()}>Rozwiązania</span>
          <li>
            <Link to={"/"}> System rezerwacji</Link>
          </li>
          <li>
            <Link to={"/"}> Integracje</Link>
          </li>
          <li>
            <Link to={"/"}> Cennik</Link>
          </li>
          <li>
            <Link to={"/"}> Demo</Link>
          </li>
        </ul>
        <ul className={`footer-list ${listVariant()}`}>
          <span className={titleVariant()}>O nas</span>
          <li>
            <Link to={"/"}> Partnerzy</Link>
          </li>
          <li>
            <Link to={"/"}> Kariera</Link>
          </li>
          <li>
            <Link to={"/"}> Współpraca</Link>
          </li>
        </ul>
      </div>
      <div className="footer-newsletter flex max-[800px]:flex-col justify-between mt-12 pb-12 border-b-1 border-b-neutral-300">
        <div className="footer-newsletter-title flex flex-col gap-1">
          <span className="font-bold text-xl">
            Dołącz do naszego newslettera
          </span>
          <span className="">
            Najnowsze zmiany, promocje, wysyłane do Ciebie tygodniowo.
          </span>
        </div>
        <div className="footer-newsletter-actions">
          <Formik
            initialValues={{
              email: "",
            }}
            validate={(values) => {
              const errors = {} as any;

              if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
              ) {
                errors.email = "Nieprawidłowy adres email";
              }
              return errors;
            }}
            onSubmit={(values) => {
              console.log("Dołączono do newslettera...");
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
                className="flex gap-2 max-[450px]:flex-col"
              >
                <input
                  type="email"
                  name="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  className={`outline-blue-700 border p-2 bg-white border-neutral-300 rounded-md`}
                  placeholder="example@gmail.com"
                />
                <button
                  type="submit"
                  className=" bg-blue-700 hover:bg-blue-800 p-2 active:bg-blue-900 transition duration-300 ease-in-out rounded-md  text-white shadow-md cursor-pointer w-max max-[1024px]:w-full"
                  disabled={isSubmitting}
                >
                  Dołącz
                </button>
              </form>
            )}
          </Formik>
        </div>
      </div>
      <div className="footer-company-details flex justify-between mt-12">
        <div className="footer-company-details-title">
          <span className="font-bold">@2025 HipsStreetwear</span>
        </div>
        <ul className="footer-company-details-socials flex gap-0.5">
          <li>
            <FacebookIcon className="text-neutral-500" />
          </li>
          <li>
            <InstagramIcon className="text-neutral-500" />
          </li>
          <li>
            <PinterestIcon className="text-neutral-500" />
          </li>
          <li>
            <XIcon className="text-neutral-500" />
          </li>
          <li>
            <YouTubeIcon className="text-neutral-500" />
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
