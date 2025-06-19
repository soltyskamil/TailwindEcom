import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loggedIn: {
    login: "",
    name: "",
    surname: "",
    status: false,
  },
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
  },
});

export const { setLoggedIn, setLoggedOut } = accountSlice.actions;
export default accountSlice.reducer;
