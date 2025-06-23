import React from "react";
import { useSelector } from "react-redux";
import ProductCard from "../../ProductCard/ProductCard";

const AccountWishlist = () => {
  const { wishlist } = useSelector((state: any) => state.productsSliceReducer);

  return (
    <div className="account-orders p-8 h-full">
      <h3 className="text-2xl font-bold">Twoja lista życzeń</h3>
      <div className="account-orders-list grid grid-cols-2">
        {wishlist.map((product: any) => (
          <ProductCard {...product} />
        ))}
      </div>
    </div>
  );
};

export default AccountWishlist;
