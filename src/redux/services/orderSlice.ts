import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../constants/api";

export const orderSlice = createApi({
    reducerPath: "orderSlice",
    baseQuery: fetchBaseQuery({ baseUrl: BASE_URL + "/order", credentials: 'include' }),
    endpoints: (builder) => ({
        getAllOrders: builder.query({
            query: () => "/get-all-orders",
        }),
        getOrderById: builder.query({
            query: (id) => `/get-order-by-id/${id}`,
            transformResponse: (response: any) => response?.order
        })
    }),
});

export const { useGetAllOrdersQuery , useGetOrderByIdQuery } = orderSlice;


