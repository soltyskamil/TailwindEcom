import React, { useRef, useEffect } from "react";
import { useSelector } from "react-redux";

import ProductCard from "../../components/ProductCard/ProductCard";
import ProductsList from "../../components/ProductsList/ProductsList";
import gsap from "gsap";
gsap.registerPlugin(gsap);

const Basket = () => {
  const { basket } = useSelector((state: any) => state.productsSliceReducer);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const productsRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (!productsRefs.current) return;

    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          gsap.fromTo(
            entry.target,
            { y: 25 },
            { y: 0, opacity: 1, duration: 1 }
          );
          observerRef.current?.unobserve(entry.target);
        }
      });
    });

    productsRefs.current.forEach((product: any) => {
      observerRef.current?.observe(product);
    });

    return () => observerRef.current?.disconnect();
  }, []);

  return (
    <div className="basket p-20 max-[1024px]:p-8">
      <h3 className="text-4xl">Twój koszyk</h3>
      <div className="products-wrapper grid grid-cols-2 gap-4 mt-6 max-[1024px]:grid-cols-1 ">
        {basket.map((product: any, idx: number) => (
          <ProductCard
            {...product}
            key={product.id}
            ref={(product: any) => (productsRefs.current[idx] = product)}
          />
        ))}
      </div>
    </div>
  );
};

export default Basket;
