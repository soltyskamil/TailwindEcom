import { combineReducers } from "@reduxjs/toolkit";
import { api } from "../api/api";

import productsSliceReducer from "./products-reducer";
import accountSliceReducer from "./account-reducer";

export const rootReducer = combineReducers({
  productsSliceReducer,
  accountSliceReducer,
  [api.reducerPath]: api.reducer,
});
