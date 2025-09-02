import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../constants/api";

export const productSlice = createApi({
    reducerPath: "productSlice",
    baseQuery: fetchBaseQuery({ baseUrl: BASE_URL + "/products", credentials: 'include' }),
    endpoints: (builder) => ({
        getAllProducts: builder.query({
            query: ({ page, limit, keyword }) => ({
                url: "/get-all-products",
                method: "GET",
                params: {
                    page,
                    limit,
                    keyword
                }
            }),
        }),
        getProductById: builder.query({
            query: (id) => `/get-product-by-id/${id}`,
            transformResponse: (response: any) => response?.pkg
        }),
        addProduct: builder.mutation({
            query: (body) => ({
                url: "/add-product",
                method: "POST",
                body,
            }),
        }),
        updateProduct: builder.mutation({
            query: ({ id, body }) => ({
                url: `/update-product/${id}`,
                method: "PUT",
                body,
            }),
        })
    }),
});

export const { useGetAllProductsQuery, useGetProductByIdQuery, useAddProductMutation  , useUpdateProductMutation} = productSlice;


