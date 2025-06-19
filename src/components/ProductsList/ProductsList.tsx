import React, { useEffect, useState, useRef, useCallback } from "react";
import { store } from "../../store/main-store";
import { productsSlice } from "../../store/products-reducer";
import ProductCard from "../ProductCard/ProductCard";
import { Carousel } from "react-responsive-carousel";
import Slider from "react-slick";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import { motion, useMotionValue, useAnimation } from "framer-motion";
import type { PanInfo } from "framer-motion";
import { useWindowSize } from "@uidotdev/usehooks";
import { debounce } from "lodash";
import "./ProductsList.css";
const ProductsList = () => {
  /**
   * Mainstate
   */
  const { products } = store.getState().productsSliceReducer;
  const [index, setIndex] = useState(1);
  const [prevIndex, setPrevIndex] = useState(0);
  const [chunkSize, setChunkSize] = useState(4);
  const [maxIndex, setMaxIndex] = useState(products.length / chunkSize);
  const [dragged, setDragged] = useState(false);
  const [width, setWidth] = useState(0);
  const size = useWindowSize();
  const [constraintLeft, setConstraintLeft] = useState(0);
  const [node, setNode] = useState<HTMLElement>();

  /**
   * Breakpoints
   */
  const [isDesktopSmall, setIsSmallDesktop] = useState(
    window.innerWidth < 1440 && window.innerWidth > 840
  );
  const [isTablet, setIsTablet] = useState(
    window.innerWidth < 840 && window.innerWidth > 540
  );
  const [isMobile, setIsMobile] = useState(window.innerWidth < 540);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 1440);

  /**
   * Refs
   */
  const carouselRef = useRef<HTMLDivElement>(null);
  const productsContainer = useRef<HTMLDivElement>(null);
  const productRef = useRef<HTMLDivElement>(null);
  const constraintRef = useRef<HTMLDivElement>(null);

  /**
   * Hooks
   */
  const x = useMotionValue(0);
  const controls = useAnimation();

  /**
   * Next/previous chunk handler
   */
  const handleNextChunk = () => {
    if (index === maxIndex - 1) return;
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

  // useEffect(() => {
  //   x.set(x.get() + 2);
  //   // console.log(x.get());
  // }, [size]);

  /**
   * Handles user drag and sets correct index based on it
   */
  const handleDrag = (e: MouseEvent | TouchEvent, info: PanInfo) => {
    console.log(x.get());
    setDragged(true);
    // if (!productsContainer.current) return;
    // const styles = getComputedStyle(productsContainer.current);
    // const value = Number(styles.getPropertyValue("transform").split(",")[4]);
    // console.log(value);

    // if (value > -1300) {
    //   setIndex(2);
    // }
    // if (value >= -2600 && value <= -1300) {
    //   setIndex(2);
    // }
    // if (value >= -3900 && value <= -2600) {
    //   setIndex(3);
    // }
    // if (value >= -5550 && value <= -3900) {
    //   setIndex(4);
    // }
    // if (value <= -5550) {
    //   setIndex(5);
    // }
  };

  /**
   * UseEffect responsible for responsiveness
   */

  // console.log("dd");
  const [offset, setOffset] = useState(0);
  useEffect(() => {
    if (!node) return;
    if (!carouselRef.current) return;
    const scrollableWidth =
      carouselRef.current.scrollWidth - carouselRef.current.offsetWidth;
    setWidth(scrollableWidth);

    setOffset((prev) => prev++);

    setIsDesktop(window.innerWidth > 1440);
    setIsSmallDesktop(window.innerWidth < 1440 && window.innerWidth > 840);
    setIsTablet(window.innerWidth < 840 && window.innerWidth > 540);
    setIsMobile(window.innerWidth < 540);
  }, [size]);

  // useEffect(() => {
  //   console.log(width);
  // }, [width]);

  /**
   * UseEffect responsible for setting correct chunk size
   */
  useEffect(() => {
    if (isDesktop) {
      setChunkSize(4);
    }
    if (isDesktopSmall) {
      setChunkSize(3);
    }
    if (isTablet) {
      setChunkSize(2);
    }
    if (isMobile) {
      setChunkSize(1);
    }
  }, [size]);

  /**
   * Useeffect responsible for setting max index
   */
  useEffect(() => {
    if (isDesktopSmall) {
      setMaxIndex(Math.round(products.length / chunkSize));
    } else setMaxIndex(products.length / chunkSize);
  }, [chunkSize]);

  /**
   * Useeffect responsible for animation handling
   */
  useEffect(() => {
    if (!carouselRef.current || !productRef.current) return;
    if (dragged) return;
    const productWidth = productRef.current.offsetWidth + 16;

    // if (index === 1 && prevIndex === 0) return;

    if (prevIndex < index) {
      if (index === 1) return;
      controls.start({
        x: chunkSize * index * -productWidth,
      });
    }
    if (prevIndex > index) {
      controls.start({
        x: chunkSize * index * -productWidth + chunkSize * productWidth,
      });
    }
  }, [index, prevIndex]);

  const containerRef = useCallback((node: HTMLElement | null) => {
    if (!node) return;
    setNode(node);
  }, []);
  useEffect(() => {
    if (!node) return;

    const handleResize = debounce(() => {
      setConstraintLeft(-(node.scrollWidth - node.clientWidth));
    }, 500);

    handleResize();

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(node);

    return () => resizeObserver.disconnect();
  }, [node]);

  return (
    <div className="products-wrapper  relative p-20 max-[1024px]:p-8">
      <button
        onClick={handlePreviousChunk}
        // key={JSON.stringify(size.width)}
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
          // dragConstraints={constraintRef}
          dragConstraints={{ right: 0, left: constraintLeft }}
          // dragConstraints={{ right: 0, left: -width }}
          style={{ x }}
          // style={{ translateX: 0 }} backup
          animate={controls}
          id="products"
          ref={containerRef}
          key={JSON.stringify(size.width)}
          className="product-list flex"
        >
          {products.map((product: any, idx: number) => (
            <ProductCard {...product} key={idx} ref={productRef} />
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default ProductsList;
