import React, { useEffect, useState } from "react";
import { store } from "../../store/main-store";
import { productsSlice } from "../../store/products-reducer";
import ProductCard from "../ProductCard/ProductCard";
import { Carousel } from "react-responsive-carousel";
import Slider from "react-slick";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import { motion, useDragControls } from "framer-motion";

import "./ProductsList.css";
const ProductsList = () => {
  const { products } = store.getState().productsSliceReducer;
  const [index, setIndex] = useState(1);
  const [chunkSize, setChunkSize] = useState(4);
  const [imagesToDisplay, setImagesToDisplay] = useState([]);
  const controls = useDragControls();

  useEffect(() => {
    const updatedArr = products.slice(
      chunkSize * index - chunkSize,
      chunkSize * index
    );

    setImagesToDisplay([...updatedArr] as any);
  }, [products, index]);

  const handleNextChunk = () => {
    const maxIndex = products.length / chunkSize;
    if (index === maxIndex - 1) return;
    setIndex((prev: number) => prev + 1);
  };

  const handlePreviousChunk = () => {
    if (index === 1) return;
    setIndex((prev: number) => prev - 1);
  };

  return (
    <div className="products-wrapper border relative p-20 ">
      <button
        onClick={handlePreviousChunk}
        className="border p-4 absolute top-1/2 left-2 "
      >
        <ArrowBackIosNewOutlinedIcon fontSize="large" />
      </button>
      <button
        onClick={handleNextChunk}
        className="border p-4 absolute top-1/2 right-2"
      >
        <ArrowForwardIosOutlinedIcon fontSize="large" />
      </button>
      <div
        id="products"
        className="product-list grid grid-cols-4 grid-rows-auto  max-[1300px]:grid-cols-3 max-[1024px]:grid-cols-2 max-[640px]:grid-cols-1 gap-4  max-[1024px]:p-8"
      >
        {imagesToDisplay.map((product: any, idx: number) => (
          <ProductCard {...product} key={idx} />
        ))}
      </div>
    </div>
  );
};

export default ProductsList;
