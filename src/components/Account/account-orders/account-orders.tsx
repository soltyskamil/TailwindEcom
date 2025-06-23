import React from "react";
import { useSelector } from "react-redux";
import ProductCard from "../../ProductCard/ProductCard";

const AccountOrders = () => {
  const { basket } = useSelector((state: any) => state.productsSliceReducer);
  console.log(basket);
  return (
    <div className="account-orders p-8 h-full">
      <h3 className="text-2xl font-bold">Zamówienia</h3>
      <div className="account-orders-list grid grid-cols-2">
        {basket.map((product: any) => (
          <ProductCard {...product} />
        ))}
      </div>
    </div>
  );
};

export default AccountOrders;
