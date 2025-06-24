import { createSlice } from "@reduxjs/toolkit";
import type { Product } from "./products-reducer";
type initialStateProps = {
  loggedIn: {
    login: string;
    name: string;
    surname: string;
    status: boolean;
  };
  orders: Product[];
};

const initialState: initialStateProps = {
  loggedIn: {
    login: "",
    name: "",
    surname: "",
    status: false,
  },
  orders: [],
};

export const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    setLoggedIn: (state, action) => {
      state.loggedIn = { ...action.payload, status: true };
    },
    setLoggedOut: (state, action) => {
      state.loggedIn = { ...initialState.loggedIn };
    },
    setOrders: (state, action) => {
      const ordersTimeStamp = action.payload.map((product: any) => {
        return { ...product, timeStamp: new Date().toUTCString() };
      });
      console.log(ordersTimeStamp);
      state.orders = [...state.orders, ...ordersTimeStamp];
    },
  },
});

export const { setLoggedIn, setLoggedOut, setOrders } = accountSlice.actions;
export default accountSlice.reducer;
