import React from "react";
import { useSelector } from "react-redux";
import ProductCard from "../../ProductCard/ProductCard";

const AccountOrders = () => {
  const { orders } = useSelector((state: any) => state.accountSliceReducer);
  console.log(orders);

  return (
    <div className="account-orders p-8 h-full">
      <h3 className="text-2xl font-bold">Zamówienia</h3>
      <div className="account-orders-list grid grid-cols-2 max-[1024px]:grid-cols-1">
        {orders &&
          orders.map((product: any) => (
            <div className="order">
              <ProductCard {...product} />
              <span>{product.timestamp}</span>
            </div>
          ))}
      </div>
    </div>
  );
};

export default AccountOrders;
