import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ProductCard from "../../ProductCard/ProductCard";
import useHandleGetItems from "../../../hooks/handle-get-items";

const AccountOrders = () => {
  const [orders, setOrders] = useState([]);
  const { handleGetItems } = useHandleGetItems();

  useEffect(() => {
    const fetchItems = async () => {
      const items = await handleGetItems("orders");
      if (items) {
        setOrders(items);
      }
    };
    fetchItems();
  }, []);

  // const { orders } = useSelector((state: any) => state.accountSliceReducer);

  return (
    <div className="account-orders p-8 h-full">
      <h3 className="text-2xl font-bold">Zamówienia</h3>
      <div className="account-orders-list grid grid-cols-2 max-[1024px]:grid-cols-1">
        {orders.length > 0 &&
          orders.map((product: any, idx: number) => (
            <ProductCard {...product} key={idx} />
          ))}
      </div>
    </div>
  );
};

export default AccountOrders;
