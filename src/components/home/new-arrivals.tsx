import React from "react";
import { useSelector } from "react-redux";
import ProductCard from "../ProductCard/ProductCard";

const NewArrivals = () => {
  const { products } = useSelector((state: any) => state.productsSliceReducer);

  return (
    <div className="new-arrivals">
      <h2 className="text-5xl w-max m-auto ">Nowości</h2>
      <div className="new-arrivals-wrapper grid grid-cols-3 max-[850px]:grid-cols-2">
        {products.slice(0, 3).map((p: any, idx: number) => (
          <ProductCard {...p} key={idx} />
        ))}
      </div>
    </div>
  );
};

export default NewArrivals;
