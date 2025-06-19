import React, { useEffect } from "react";
import gsap from "gsap";
import "./Hero.css";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useGetProductsMutation } from "../../api/products";
import { useGetProducts } from "../../hooks/use-get-products";
gsap.registerPlugin(gsap);
const images = import.meta.glob("/src/assets/hero-images/*.webp");
const imagePaths = Object.values(images).map((image: any) => image.name);

const Hero = () => {
  return (
    <div className="hero flex max-[1024px]:m-8 max-[350px]:mx-4 max-[1024px]:mt-16 max-[1024px]:bg-white  relative items-center max-w-[1440px] m-auto justify-between p-20 gap-10 max-[1024px]:p-8">
      <div className="hero-cta max-w-[50%] flex flex-col gap-8 max-[1024px]:max-w-[100%] max-[1024px]:z-20">
        <h2 className="text-6xl max-[1440px]:text-4xl font-extrabold">
          Witaj w Hips streetwear
        </h2>
        <span className="description text-xl">
          Hips Streetwear to więcej niż marka – to styl życia. Łączymy
          limitowane kolekcje, odważne wzory i najwyższą jakość, abyś mógł
          wyrazić siebie przez modę. Nasze ubrania to nie tylko strój, to
          manifest Twojej niezależności.
        </span>
        <a
          href="#products"
          className="cta active:bg-neutral-200  transition duration-200 cursor-pointer ease-in hover:bg-neutral-200 hover:border-neutral-300 w-max bg-neutral-100 border border-neutral-200 rounded-md p-2 text-2xl mt-2 flex items-center max-[1024px]:p-3"
        >
          Zobacz więcej
          <KeyboardArrowDownIcon />
        </a>
      </div>
      <div className="carousel-wrapper  max-[1024px]:opacity-25 bg-black max-[1024px]:bg-black max-[1024px]:bg-blend-multiply max-[1024px]: max-[1024px]:absolute max-[1024px]:top-0 max-[1024px]:left-0 max-[1024px]:rounded-none max-[1024px]:max-w-full max-[1024px]:z-10 max-w-1/2 w-full flex transform- h-full rounded-4xl overflow-hidden">
        <Carousel
          showArrows={false}
          showIndicators={false}
          swipeable={true}
          showThumbs={false}
          className="h-full max-[1024px]:h-full"
          showStatus={false}
          infiniteLoop={true}
          autoPlay={true}
          interval={5000}
          dynamicHeight={true}
        >
          {imagePaths.map((image: any) => (
            <img src={image} alt="hero-image" className="h-132 object-cover" />
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default Hero;
