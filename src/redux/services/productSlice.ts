import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../constants/api";

export const productSlice = createApi({
    reducerPath: "productSlice",
    baseQuery: fetchBaseQuery({ baseUrl: BASE_URL + "/products", credentials: 'include' }),
    endpoints: (builder) => ({
        getAllProducts: builder.query({
            query: () => "/get-all-products",
        }),
        getProductById: builder.query({
            query: (id) => `/get-product-by-id/${id}`,
            transformResponse: (response: any) => response?.pkg
        })
    }),
});

export const { useGetAllProductsQuery  , useGetProductByIdQuery} = productSlice;


