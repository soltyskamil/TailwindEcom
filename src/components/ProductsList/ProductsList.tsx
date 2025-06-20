import { useEffect, useState, useRef, useCallback } from "react";
import { store } from "../../store/main-store";
import ProductCard from "../ProductCard/ProductCard";
import { motion, useMotionValue, animate } from "framer-motion";

import { useWindowSize } from "@uidotdev/usehooks";
import { chunk, debounce } from "lodash";
import "./ProductsList.css";
const ProductsList = () => {
  const { products } = store.getState().productsSliceReducer;
  const [constraintLeft, setConstraintLeft] = useState(0);
  const [node, setNode] = useState<HTMLElement>();
  const carouselRef = useRef<HTMLDivElement>(null);
  const productRef = useRef<HTMLDivElement>(null);
  const size = useWindowSize();

  const xTranslation = useMotionValue(0);
  const FAST_DURATION = 20;
  const SLOW_DURATION = 75;
  const [duration, setDuration] = useState(FAST_DURATION);
  const [mustFinish, setMustFinish] = useState(false);
  const [rerender, setRerender] = useState(false);
  const { width } = useWindowSize();
  const [chunks, setChunks] = useState(4);

  const calculateChunkSize = () => {
    if (!width) return;

    let chunkSize;
    if (width <= 540) {
      chunkSize = 1;
    }
    if (width > 540 && width < 840) {
      chunkSize = 2;
    }
    if (width > 840 && width < 1440) {
      chunkSize = 3;
    }
    if (width > 1440) {
      chunkSize = 4;
    }
    console.log(chunkSize);

    return chunkSize;
  };

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

  useEffect(() => {
    setChunks(calculateChunkSize() as any);
    setRerender(!rerender);
  }, [size]);

  useEffect(() => {
    if (constraintLeft === 0 || constraintLeft == -0) return;
    let controls;
    if (mustFinish) {
      controls = animate(xTranslation, [xTranslation.get(), constraintLeft], {
        ease: "linear",
        duration: duration * (1 - xTranslation.get() / constraintLeft),
        onComplete: () => {
          setMustFinish(false);
          setRerender(!rerender);
        },
      });
    } else {
      controls = animate(xTranslation, [0, constraintLeft], {
        ease: "linear",
        duration: duration,
        repeat: Infinity,
      });
    }

    return controls?.stop;
  }, [duration, xTranslation, mustFinish, constraintLeft]);

  useEffect(() => {
    xTranslation.set(0);
  }, [size]);

  return (
    <div className="products-wrapper  py-20 max-[1024px]:p-8">
      <div className="carousel-wrapper overflow-hidden" ref={carouselRef}>
        <motion.div
          drag="x"
          style={{ x: xTranslation }}
          dragConstraints={{ right: 0, left: constraintLeft }}
          id="products"
          ref={containerRef}
          onHoverStart={() => {
            setMustFinish(true);
            setDuration(SLOW_DURATION);
          }}
          onHoverEnd={() => {
            setMustFinish(true);
            setDuration(FAST_DURATION);
          }}
          key={JSON.stringify(rerender) + JSON.stringify(size)}
          className="product-list left-0 flex"
        >
          {[...products, ...products.slice(0, chunks)].map(
            (product: any, idx: number) => (
              <ProductCard {...product} key={idx} ref={productRef} />
            )
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default ProductsList;
