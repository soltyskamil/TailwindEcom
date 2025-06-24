import { useEffect } from "react";
import { store } from "../../store/main-store";
import ProductCard from "../ProductCard/ProductCard";
import { motion, useMotionValue } from "framer-motion";
import {
  FAST_DURATION,
  SLOW_DURATION,
} from "../../hooks/handle-carousel-animation";
import { useWindowSize } from "@uidotdev/usehooks";
import "./ProductsList.css";
import { useCalculateChunkSize } from "../../hooks/handle-chunk-size";
import { useHandleCarouselAnimation } from "../../hooks/handle-carousel-animation";
import { useHandleCarouseResize } from "../../hooks/handle-carousel-resize";
const ProductsList = () => {
  const { products } = store.getState().productsSliceReducer;
  const size = useWindowSize();
  const xTranslation = useMotionValue(0);
  const { desiredChunk } = useCalculateChunkSize();
  const { constraintLeft, containerRef } = useHandleCarouseResize();
  const { setMustFinish, rerender, setDuration, setRerender } =
    useHandleCarouselAnimation({
      xTranslation,
      constraintLeft,
    });

  useEffect(() => {
    setRerender(!rerender);
    xTranslation.set(0);
  }, [size]);

  return (
    <div className="products-wrapper">
      <div className="carousel-wrapper overflow-hidden ">
        <motion.div
          drag="x"
          style={{ x: xTranslation }}
          dragConstraints={{ right: 0, left: constraintLeft }}
          id="products"
          ref={containerRef}
          key={JSON.stringify(rerender) + JSON.stringify(size)}
          className="product-list left-0 flex"
        >
          {products.length > 0 &&
            [...products, ...products.slice(0, desiredChunk)].map(
              (product: any, idx: number) => (
                <ProductCard
                  {...product}
                  setDuration={setDuration}
                  setMustFinish={setMustFinish}
                  key={idx}
                />
              )
            )}
        </motion.div>
      </div>
    </div>
  );
};

export default ProductsList;
