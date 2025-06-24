import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import ProductCard from "../../ProductCard/ProductCard";
import { useState } from "react";
import useHandleGetItems from "../../../hooks/handle-get-items";

const AccountWishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const { handleGetItems } = useHandleGetItems();

  useEffect(() => {
    const fetchItems = async () => {
      const items = await handleGetItems("wishlist");
      if (items) {
        setWishlist(items);
      }
    };
    fetchItems();
  }, []);

  // const { wishlist } = useSelector((state: any) => state.productsSliceReducer);

  return (
    <div className="account-orders p-8 h-full">
      <h3 className="text-2xl font-bold">Twoja lista życzeń</h3>
      <div className="account-orders-list grid grid-cols-2 max-[1024px]:grid-cols-1">
        {wishlist.map((product: any, idx: number) => (
          <ProductCard {...product} key={idx} />
        ))}
      </div>
    </div>
  );
};

export default AccountWishlist;
