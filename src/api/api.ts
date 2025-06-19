import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "../utils/axios-base.query";
import { API_URL } from "../envs.ts";
export type ErrorRTK = { error: { status: number; data: { message: string } } };

export const api = createApi({
  reducerPath: "splitApi",
  baseQuery: axiosBaseQuery({
    baseUrl: `${API_URL}`,
  }),

  endpoints: () => ({}),
});
