import React, { useEffect, useState, useRef } from "react";
import { store } from "../../store/main-store";
import { productsSlice } from "../../store/products-reducer";
import ProductCard from "../ProductCard/ProductCard";
import { Carousel } from "react-responsive-carousel";
import Slider from "react-slick";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import { motion, useMotionValue, useAnimation } from "framer-motion";
import type { PanInfo } from "framer-motion";

import "./ProductsList.css";
const ProductsList = () => {
  const { products } = store.getState().productsSliceReducer;
  const [index, setIndex] = useState(1);
  const [prevIndex, setPrevIndex] = useState(1);
  const [chunkSize, setChunkSize] = useState(4);
  const [dragged, setDragged] = useState(false);
  const [width, setWidth] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const productsContainer = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const controls = useAnimation();

  useEffect(() => {
    if (!carouselRef.current) return;
    const scrollableWidth =
      carouselRef.current.scrollWidth - carouselRef.current.offsetWidth;
    setWidth(scrollableWidth);
  }, []);

  const handleNextChunk = () => {
    const maxIndex = products.length / chunkSize - 1;

    if (index >= maxIndex) return;
    else {
      setDragged(false);
      setPrevIndex(index);
      setIndex((prev) => prev + 1);
    }
  };
  const handlePreviousChunk = () => {
    if (index === 1) return;
    else {
      setDragged(false);
      setPrevIndex(index);
      setIndex((prev) => prev - 1);
    }
  };

  useEffect(() => {
    if (!carouselRef.current) return;
    if (dragged) return;

    if (index === 1 && prevIndex == 1) return;
    if (prevIndex < index) {
      if (index === 4) {
        controls.start({
          x: 4 * index * -352 + 352,
        });
      } else {
        controls.start({
          x: 4 * index * -352,
        });
      }
    }
    if (prevIndex > index) {
      controls.start({
        x: chunkSize * index * -352 + chunkSize * 352,
      });
    }
  }, [index]);

  const handleDrag = (e: MouseEvent | TouchEvent, info: PanInfo) => {
    if (!productsContainer.current) return;
    setDragged(true);
    const styles = getComputedStyle(productsContainer.current);
    const value = Number(styles.getPropertyValue("transform").split(",")[4]);
    console.log(value);

    if (value > -1300) {
      console.log("1");
      setIndex(2);
    }
    if (value >= -2600 && value <= -1300) {
      console.log("3");
      setIndex(2);
    }
    if (value >= -3900 && value <= -2600) {
      console.log("4");

      setIndex(3);
    }
    if (value >= -5550 && value <= -3900) {
      console.log("5");

      setIndex(4);
    }
  };

  return (
    <div className="products-wrapper  relative p-20">
      <button
        onClick={handlePreviousChunk}
        className="border p-4 absolute top-1/2 left-2"
      >
        <ArrowBackIosNewOutlinedIcon fontSize="large" />
      </button>
      <button
        onClick={handleNextChunk}
        className="border p-4 absolute top-1/2 right-2"
      >
        <ArrowForwardIosOutlinedIcon fontSize="large" />
      </button>
      <div className="carousel-wrapper overflow-hidden" ref={carouselRef}>
        <motion.div
          drag="x"
          onDragEnd={handleDrag}
          dragConstraints={{ right: 0, left: -width }}
          style={{ x }}
          animate={controls}
          id="products"
          ref={productsContainer}
          className="product-list flex max-[1300px]:grid-cols-3 max-[1024px]:grid-cols-2 max-[640px]:grid-cols-1 gap-4  max-[1024px]:p-8"
        >
          {products.map((product: any, idx: number) => (
            <ProductCard {...product} key={idx} />
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default ProductsList;
