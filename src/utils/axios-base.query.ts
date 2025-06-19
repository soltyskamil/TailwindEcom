import type { BaseQueryFn } from "@reduxjs/toolkit/query";
import type { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import axios from "axios";

export const axiosBaseQuery =
  (
    { baseUrl }: { baseUrl: string } = { baseUrl: "" }
  ): BaseQueryFn<
    {
      url: string;
      method: AxiosRequestConfig["method"];
      data?: AxiosRequestConfig["data"];
      params?: AxiosRequestConfig["params"];
      abortController?: AbortController;
    },
    unknown,
    unknown,
    unknown,
    { request: AxiosRequestConfig; response?: AxiosResponse }
  > =>
  async ({ url, method, data, params, abortController }) => {
    try {
      const request: AxiosRequestConfig = {
        url: baseUrl + url,
        method,
        data,
        params,
        signal: abortController?.signal,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      };

      const result = await axios(request);
      return {
        data: result.data,
        meta: { request: request, response: result },
      };
    } catch (axiosError) {
      const err = axiosError as AxiosError;
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      };
    }
  };
