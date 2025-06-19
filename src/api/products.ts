import { api } from "./api";

const productsApi = api.injectEndpoints({
  endpoints: (build) => ({
    getProducts: build.mutation<{ success: boolean; data?: any[] }, any>({
      query: () => ({
        url: `/products`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetProductsMutation } = productsApi;
