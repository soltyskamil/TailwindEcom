import React from "react";
import { Link } from "react-router";

const NotFound = () => {
  return (
    <div className="not-found min-h-dvh p-12 max-[800px]:p-4 bg-neutral-700 flex items-center bg-blend-multiply bg-[url('assets/hero-images/hero-images2.webp')]">
      <div className="not-found-wrapper max-w-3/4 max-[800px]:max-w-full m-auto text-center">
        <h2 className="text-9xl font-bold text-white max-[500px]:text-7xl">
          404
        </h2>
        <div className="not-found-details flex flex-col gap-2 mt-4">
          <span className="text-white text-5xl font-bold max-[500px]:text-3xl">
            Ups! Nie znaleziono strony...
          </span>
          <span className="text-white text-xl max-[500px]:text-md">
            Przepraszamy, ale wyszukiwana przez Ciebie strona nie istnieje.
            Jeżeli myślisz że to pomyłka napisz do nas.
          </span>

          <Link
            to={"/"}
            className="bg-blue-700 w-max m-auto hover:bg-blue-800 max-[500px]:w-full active:bg-blue-900 transition duration-300 ease-in-out cursor-pointer text-white p-2 font-bold rounded-md"
          >
            Wróć na stronę główną
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
