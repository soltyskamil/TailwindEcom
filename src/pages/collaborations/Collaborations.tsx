import React, { useEffect } from "react";

const images = import.meta.glob("/src/assets/hero-images/*.webp");
const imagesAnimated = import.meta.glob("/src/assets/fashion-team/*.jpg");
import gridImg from "../../assets/animated/grid-img.png";
import jacketImg from "../../assets/animated/jacket-removed.svg";
import stockVideo from "../../assets/skateboard.mp4";
import gsap from "gsap";
import { useRef } from "react";
import { Link } from "react-router";
gsap.registerPlugin(gsap);
const imagePaths = Object.values(imagesAnimated).map(
  (image: any) => image.name
);
const Collaborations = () => {
  const graphicRefsFirstChild = useRef<HTMLDivElement>(null);
  const graphicRefsSecondChild = useRef<HTMLDivElement>(null);
  const oberverRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (!graphicRefsFirstChild.current || oberverRef.current) return;

    oberverRef.current = new IntersectionObserver((entries) => {
      entries.forEach((entry: any) => {
        if (entry.isIntersecting) {
          gsap.fromTo(
            graphicRefsFirstChild.current,
            {
              y: 0,
            },
            {
              duration: 2,
              y: -228,
              ease: "power1.in",
              yoyo: true,
              repeat: -1,
              onComplete: () => {
                gsap.to(graphicRefsFirstChild.current, {
                  y: 0,
                  duration: 2,
                  ease: "power1.in",
                });
              },
            }
          );
          oberverRef.current?.unobserve(entry.target);
        }
      });
    });

    oberverRef.current.observe(graphicRefsFirstChild.current);
    return () => oberverRef.current?.disconnect();
  }, [graphicRefsFirstChild]);
  return (
    <div
      className="
  my-20
explore-inspirations
min-h-screen
p-2
grid
grid-auto-flow-dense
grid-cols-1
gap-4
sm:grid-cols-2
sm:grid-rows-4
md:grid-cols-3
md:grid-rows-3
xl:grid-cols-6
xl:gap-8
xl:[grid-template-areas:'a_a_b_b_c_c''d_d_b_b_c_c''d_d_e_e_c_c''d_d_e_e_c_c''d_d_e_e_c_c''d_d_e_e_c_c''d_d_e_e_g_g''d_d_e_e_g_g''d_d_e_e_f_f''d_d_e_e_f_f''d_d_e_e_f_f''d_d_e_e_f_f']
"
    >
      <div className="flex flex-col justify-center items-center bg-gradient-to-br from-white via-neutral-100 to-neutral-200 rounded-xl shadow-md col-span-1 xl:[grid-area:a] p-6 relative overflow-hidden">
        <div
          ref={graphicRefsFirstChild}
          className="absolute inset-0 opacity-10 text-[12rem] md:text-[16rem] xl:text-[20rem] font-black text-neutral-300 pointer-events-none flex items-center justify-center select-none"
        >
          Moda
        </div>
        <div className="relative z-10 flex flex-col gap-2 items-center">
          <h2 className="font-black text-4xl md:text-6xl xl:text-8xl text-neutral-800 tracking-tight">
            Kolaboracje
          </h2>
          <span className="text-base md:text-lg xl:text-xl text-neutral-600">
            Nasi partnerzy
          </span>
          <p className="text-center text-sm md:text-base text-neutral-500 mt-4 max-w-xs md:max-w-md">
            “Najlepszy sklep streetwear 2025”
            <br />
            <span className="text-xs text-neutral-400">
              Anonimowy użytkownik
            </span>
          </p>
        </div>
      </div>

      {/* B */}
      <div className="relative rounded-xl border-red-300 col-span-1 xl:[grid-area:b] min-h-[200px]">
        <div className="details absolute bottom-8 md:bottom-12 p-2 md:p-4 w-full flex flex-col gap-2 z-20">
          <span className="text-white text-xs">MUST HAVE</span>
          <span className="text-2xl md:text-4xl xl:text-5xl text-white font-black">
            NOWOŚCI WYBRANE DLA CIEBIE
          </span>
          <Link
            to={"/"}
            className="bg-neutral-300 opacity-40 hover:opacity-70 w-max px-3 py-1 md:px-4 md:py-2 rounded-full"
          >
            Odkryj więcej
          </Link>
        </div>
        <video
          src={stockVideo}
          className="absolute z-10 h-full w-full object-cover rounded-xl block"
          autoPlay
          muted
          loop={true}
        />
        <div className="overlay bg-black absolute opacity-50 z-10 w-full h-full rounded-xl" />
      </div>

      {/* C */}
      <div className="bg-center overflow-hidden rounded-xl relative col-span-1 xl:[grid-area:c] min-h-[200px]">
        <img
          src={imagePaths[2]}
          alt="jacket-img"
          className="object-cover h-full w-full object-center bg-black"
        />
      </div>

      {/* D */}
      <div className="relative rounded-xl col-span-1 xl:[grid-area:d] min-h-[200px]">
        <div className="images-overlay absolute h-full z-10 rounded-xl w-full">
          <img
            src={imagePaths[0]}
            alt="img-alt"
            className="object-cover h-full absolute w-full rounded-xl z-0"
          />
          <div className="overlay absolute w-full h-full bg-black opacity-75 z-10 top-0 rounded-xl" />
        </div>
      </div>

      {/* E */}
      <div className="relative rounded-xl bg-black overflow-hidden col-span-1 xl:[grid-area:e] min-h-[200px]">
        <img
          src={imagePaths[3]}
          alt="image"
          className="h-1/2 w-1/2 object-cover absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-xl"
        />
      </div>

      {/* F */}
      <div className="overflow-hidden rounded-xl relative col-span-1 xl:[grid-area:f] min-h-[200px]">
        <img
          src={imagePaths[1]}
          alt="image"
          className="h-full w-full object-cover"
        />
      </div>

      {/* G */}
      <div className="bg-neutral-800 flex justify-center items-center  relative overflow-hidden rounded-xl col-span-1 xl:[grid-area:g] min-h-[200px]">
        <span className="text-2xl md:text-4xl xl:text-5xl text-white">
          KOLABORACJE
        </span>
      </div>
    </div>
  );
};

export default Collaborations;
