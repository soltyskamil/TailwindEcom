import { createSlice, current } from "@reduxjs/toolkit";

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

    changeProductQuantity: (state, action) => {
      if (action.payload.quantity < 1) return;
      else {
        const searchedProduct = state.basket.find(
          (product: any) => product.id === action.payload.id
        );
        if (searchedProduct) {
          searchedProduct.quantity = action.payload.quantity;
        }
      }
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
export const {
  setProducts,
  addToBasket,
  addToWishlist,
  removeFromBasket,
  changeProductQuantity,
} = productsSlice.actions;

export default productsSlice.reducer;
