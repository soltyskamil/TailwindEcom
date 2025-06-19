/**
 * Hook that provides fetching products data
 *
 */
import { useGetProductsMutation } from "../api/products";

export const useGetProducts = () => {
  const [getProducts, { data }] = useGetProductsMutation();

  const handleGetProducts = async () => {
    try {
      const params = {} as Record<string, any | number>;
      const result = getProducts(params).unwrap();
      return result;
    } catch (error) {
      console.error("Wystąpił błąd podczas pobierania danych..");
    }
  };

  return {
    handleGetProducts,
    data,
  };
};
