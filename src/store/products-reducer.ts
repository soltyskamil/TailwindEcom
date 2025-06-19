import { createSlice, current } from "@reduxjs/toolkit";

export type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
};

type initialStateProps = {
  products: Product[];
  basket: Product[];
  wishlist: Product[];
};

const initialState: initialStateProps = {
  products: [],
  basket: [],
  wishlist: [],
};

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    addToBasket: (state, action) => {
      state.basket = [...state.basket, action.payload];
    },
    removeFromBasket: (state, action) => {
      const basket = current(state.basket);
      const searchedProductIndex = basket.findIndex(
        (product: Product) => product.id == action.payload.id
      );
      state.basket.splice(searchedProductIndex, 1);
    },
  },
});
export const { setProducts, addToBasket, removeFromBasket } =
  productsSlice.actions;

export default productsSlice.reducer;
