import React from "react";
import { useSelector } from "react-redux";
import ProductCard from "../ProductCard/ProductCard";

const NewArrivals = () => {
  const { newArrivals } = useSelector(
    (state: any) => state.productsSliceReducer
  );

  return (
    <div className="new-arrivals">
      <h2 className="text-5xl w-max m-auto ">Nowości</h2>
      <div className="new-arrivals-wrapper grid grid-cols-3">
        {newArrivals.slice(0, 3).map((product: any) => (
          <ProductCard {...product} />
        ))}
      </div>
    </div>
  );
};

export default NewArrivals;
