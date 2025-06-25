import React, { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
/**
 * Hook that provides total value of basket
 */

/**
 * @param data passed data that we fetched
 */
export const useHandleBasketTotal = (data: any) => {
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
    setTotalPrice(handleBasketCalculate(data));
  }, [data]);

  return {
    totalPrice,
  };
};
