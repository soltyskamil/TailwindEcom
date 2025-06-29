import React from "react";
import { useSelector } from "react-redux";
import ProductCard from "../ProductCard/ProductCard";
const BestSellers = () => {
  const { products } = useSelector((state: any) => state.productsSliceReducer);
  return (
    <div className="best-sellers">
      <h2 className="text-5xl w-max m-auto ">Bestsellery</h2>
      <div className="new-arrivals-wrapper grid grid-cols-3">
        {products.slice(3, 6).map((p: any, idx: number) => (
          <ProductCard {...p} key={idx} />
        ))}
      </div>
    </div>
  );
};

export default BestSellers;
