import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ProductCard from "../../ProductCard/ProductCard";
import useHandleGetItems from "../../../hooks/handle-get-items";
import ProductOrder from "./account-order-product";

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
    <div className="account-orders p-8 h-full max-[800px]:p-4">
      <h3 className="text-2xl font-bold mb-8">Archiwum zamówień</h3>
      <div className="account-orders-list flex flex-col gap-4">
        {orders.length > 0 &&
          orders.map((order: any, idx: number) => {
            return (
              <div className="order border p-8 border-neutral-300 bg-neutral-50 rounded-md max-[600px]:p-4">
                <div className="order-details grid grid-cols-[1fr_1fr] max-[400px]:grid-cols-1 border-b-1 border-neutral-300 pb-8">
                  <div className="order-details-id flex flex-col">
                    <span className="text-neutral-900 font-bold">
                      Numer zamówienia
                    </span>
                    <span className="text-neutral-600">{order.order}</span>
                  </div>
                  <div className="order-details-timestamp flex flex-col">
                    <span className="text-neutral-900 font-bold">
                      Data zamówienia
                    </span>
                    <span className="text-neutral-600">{order.timeStamp}</span>
                  </div>
                </div>
                <div className="order-products">
                  {order.items.map((item: any, idx: number) => (
                    <ProductOrder {...item} key={idx} />
                  ))}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default AccountOrders;
