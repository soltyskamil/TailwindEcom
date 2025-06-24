import React from "react";
import { motion } from "framer-motion";
const images = import.meta.glob("/src/assets/hero-images/*.webp");
import { Carousel } from "react-responsive-carousel";
const imagePaths = Object.values(images).map((image: any) => image.name);
const Collaborations = () => {
  return (
    <div className="collaborations h-auto p-20">
      <h2 className="text-5xl w-max m-auto">Kolaboracje</h2>
      <Carousel
        showArrows={false}
        showIndicators={true}
        swipeable={true}
        showThumbs={false}
        className="h-96 mt-5"
        showStatus={true}
        infiniteLoop={true}
        autoPlay={true}
        interval={2000}
        dynamicHeight={true}
      >
        {imagePaths.map((image: any) => (
          <img src={image} alt="hero-image" className="h-96 object-cover" />
        ))}
      </Carousel>
    </div>
  );
};

export default Collaborations;
