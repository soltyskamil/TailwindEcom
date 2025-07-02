import React, { useEffect } from "react";
import "./Explore.scss";
const images = import.meta.glob("/src/assets/hero-images/*.webp");
import ImageList from "@mui/material/ImageList";
const imagesAnimated = import.meta.glob("/src/assets/animated/*.jpg");
import gridImg from "../../assets/animated/grid-img.png";
import jacketImg from "../../assets/animated/jacket-removed.svg";
import stockVideo from "../../assets/stock-video.mp4";
import gsap from "gsap";
import { useRef } from "react";
import { Link } from "react-router";
import { duration } from "@mui/material/styles";
gsap.registerPlugin(gsap);

const imagePaths = Object.values(imagesAnimated).map(
  (image: any) => image.name
);

const Explore = () => {
  const graphicRefsFirstChild = useRef<HTMLDivElement>(null);
  const oberverRef = useRef<IntersectionObserver | null>(null);
  const spanRefs = useRef<HTMLSpanElement[]>([]);

  useEffect(() => {
    if (!spanRefs.current) return;

    gsap.fromTo(
      spanRefs.current[0],
      {
        opacity: 0,
      },
      {
        duration: 2,
        opacity: 1,
      }
    );

    spanRefs.current
      .slice(1, spanRefs.current.length)
      .forEach((s: any, idx: number) => {
        gsap.fromTo(
          s,
          {
            opacity: 0.25,
            x: -10 * idx,
          },
          {
            x: 0,
            opacity: 1,
            duration: 0.5,
            delay: idx,
          }
        );
      });
  }, [spanRefs]);

  useEffect(() => {
    if (!graphicRefsFirstChild.current || oberverRef.current) return;
    oberverRef.current = new IntersectionObserver((entries) => {
      entries.forEach((entry: any) => {
        if (entry.isIntersecting) {
          gsap.fromTo(
            graphicRefsFirstChild.current,
            { y: 0 },
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

  const string = "odkrywaj";

  return (
    <div
      className="
    my-20
    explore-inspirations
    max-h-[125vh]
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
    xl:[grid-template-areas:'a_a_b_b_c_c''a_a_b_b_c_c''a_a_b_b_c_c''a_a_b_b_c_c''a_a_b_b_c_c''a_a_b_b_c_c''a_a_b_b_c_c''d_d_b_b_c_c''d_d_e_e_c_c''d_d_e_e_c_c''d_d_e_e_g_g''d_d_e_e_f_f']
  "
    >
      <div className="flex flex-col justify-center items-center bg-gradient-to-br from-white via-neutral-100 to-neutral-200 rounded-xl shadow-md col-span-1 xl:[grid-area:a] p-6 relative overflow-hidden">
        <div
          ref={graphicRefsFirstChild}
          className="absolute inset-0 opacity-10 text-[12rem] md:text-[16rem] xl:text-[20rem] font-black text-black pointer-events-none flex items-center justify-center select-none"
        >
          : Moda
        </div>
        <div className="relative z-10 flex flex-col gap-2 items-center">
          <h2 className="font-black text-4xl md:text-6xl xl:text-8xl text-neutral-800 tracking-tight">
            Hips
          </h2>
          <span className="text-base md:text-lg xl:text-xl text-neutral-600">
            Więcej niż streetwear
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
      <div className="relative rounded-xl col-span-1 xl:[grid-area:b]">
        <div className="details absolute md:p-4 w-full h-full flex justify-around flex-col gap-2 z-20">
          <span className="text-white text-xs">MUST HAVE</span>
          <span className="text-2xl md:text-4xl xl:text-4xl text-white font-black">
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
          src={jacketImg}
          alt="jacket-img"
          className="object-cover h-full w-full object-center bg-black"
        />
        <div className="items-details bg-white/25 border rounded-xl overflow-hidden border-neutral-50/25 absolute h-1/2 w-1/2 bottom-4 right-4">
          <span className="absolute font-light top-2 left-2 max-w-3/4 text-white">
            Kurtka zimowa
          </span>
          <img
            src={jacketImg}
            alt="item-details"
            className="h-full w-full object-top rounded-xl object-contain z-20"
          />
        </div>
      </div>

      {/* D */}
      <div className="relative rounded-xl col-span-1 xl:[grid-area:d] min-h-[200px]">
        <div className="title absolute flex flex-col justify-between top-2 z-20 w-full h-full p-4 rounded-xl">
          <span className="text-2xl md:text-3xl xl:text-6xl text-white font-black">
            UNDERCOVER
          </span>
          <span className="text-lg md:text-2xl xl:text-3xl text-left text-white font-black text-center">
            W SPRZEDAŻY
          </span>
        </div>
        <div className="images-overlay absolute h-full z-10 rounded-xl w-full border" />
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
      <div className="border border-neutral-200  bg-black g-[url('assets/fashion-team/fashion-team1.jpg')] bg-center bg-cover flex justify-center items-center  relative overflow-hidden rounded-xl col-span-1 xl:[grid-area:g] min-h-[200px]">
        {string.split("").map((s: any, idx: number) => (
          <span
            key={idx}
            ref={(el: any) => (spanRefs.current[idx] = el)}
            className="text-white  text-7xl relative uppercase font-black"
          >
            {s}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Explore;
