import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import ProductCard from "../../ProductCard/ProductCard";
import { useState } from "react";
import useHandleGetItems from "../../../hooks/handle-get-items";
import WishlistProduct from "./account-wishlist-product";
import useHandleRealTimeUpdates from "../../../hooks/handle-realtime-updates";
const AccountWishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const { handleGetItems } = useHandleGetItems();
  const { handleRealTimeUpdate } = useHandleRealTimeUpdates({
    setWishlist: setWishlist,
  });

  useEffect(() => {
    const fetchItems = async () => {
      const items = await handleGetItems("wishlist");
      if (items) {
        setWishlist(items);
      }
    };
    handleRealTimeUpdate("wishlist");
    fetchItems();
  }, []);

  // const { wishlist } = useSelector((state: any) => state.productsSliceReducer);

  return (
    <div className="account-orders p-8 h-full max-[800px]:p-4">
      <h3 className="text-2xl font-bold mb-8">Twoja lista życzeń</h3>
      <div className="account-orders-list grid grid-cols-1 max-[1024px]:grid-cols-1 gap-4">
        {wishlist.map((product: any, idx: number) => (
          <WishlistProduct {...product} key={idx} />
        ))}
      </div>
    </div>
  );
};

export default AccountWishlist;
