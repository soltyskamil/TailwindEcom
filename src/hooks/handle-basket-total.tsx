import React, { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
/**
 * Hook that provides total value of basket
 */

export const useHandleBasketTotal = () => {
  const { basket } = useSelector((state: any) => state.productsSliceReducer);
  const [totalPrice, setTotalPrice] = useState(0);

  const handleBasketCalculate = (basket: any) => {
    let result = basket.reduce((acc: any, curr: any) => {
      const { price, quantity } = curr;
      const total = price * quantity;
      return acc + total;
    }, 0);
    return (result = +result.toFixed(2));
  };

  useEffect(() => {
    setTotalPrice(handleBasketCalculate(basket));
  }, [basket]);

  return {
    totalPrice,
  };
};
