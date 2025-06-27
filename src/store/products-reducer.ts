import { createSlice, current } from "@reduxjs/toolkit";
import type { ProductCardData } from "../components/basket/basket-product";

export type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  quantity?: number;
  rating: {
    rate: number;
    count: number;
  };
};

type initialStateProps = {
  products: Product[];
  basket: Product[];
  wishlist: Product[];
  newArrivals: Product[];
};

const initialState: initialStateProps = {
  products: [],
  basket: [],
  wishlist: [],
  newArrivals: [],
};

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    reset: (state) => {
      (state.basket = initialState.basket),
        (state.wishlist = initialState.wishlist);
    },
    setProducts: (state, action) => {
      const productsWithQuantity = action.payload.map((product: any) => {
        return { ...product, quantity: 1 };
      });

      state.products = productsWithQuantity;
    },
    addToBasket: (state, action) => {
      if (state.basket.some((product: any) => product.id === action.payload.id))
        return;
      else state.basket = [...state.basket, { ...action.payload, quantity: 1 }];
    },
    addToWishlist: (state, action) => {
      if (
        state.wishlist.some((product: any) => product.id === action.payload.id)
      )
        return;
      else state.wishlist = [...state.wishlist, { ...action.payload }];
    },
    setNewArrivals: (state, action) => {
      const productsWithTag = action.payload.map((product: any) => {
        return { ...product, new: true };
      });
      state.newArrivals = productsWithTag;
    },

    changeProductQuantity: (state, action) => {
      const searchedProduct = current(state.basket).find(
        (product: any) => product.id === action.payload.id
      );
      let updatedProduct: ProductCardData;
      if (!searchedProduct || !searchedProduct.quantity) return;
      switch (action.payload.operation) {
        case "+":
          updatedProduct = {
            ...searchedProduct,
            quantity: searchedProduct.quantity + 1,
          };

          state.basket = state.basket.map((p: any) =>
            p.id === searchedProduct.id ? { ...updatedProduct } : { ...p }
          );
          return;
        case "-":
          if (searchedProduct.quantity <= 1) return;
          updatedProduct = {
            ...searchedProduct,
            quantity: searchedProduct.quantity - 1,
          };
          state.basket = state.basket.map((p: any) =>
            p.id === searchedProduct.id ? { ...updatedProduct } : { ...p }
          );
      }
    },
    removeFromBasket: (state, action) => {
      const basket = current(state.basket);
      const searchedProductIndex = basket.findIndex(
        (product: Product) => product.id == action.payload.id
      );
      state.basket.splice(searchedProductIndex, 1);
    },
    clearBasket: (state) => {
      state.basket = initialState.basket;
    },
  },
});
export const {
  setProducts,
  addToBasket,
  addToWishlist,
  removeFromBasket,
  setNewArrivals,
  changeProductQuantity,
  clearBasket,
  reset,
} = productsSlice.actions;

export default productsSlice.reducer;
