import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../constants/api";

export const couponSlice = createApi({
    reducerPath: "couponSlice",
    baseQuery: fetchBaseQuery({ baseUrl: BASE_URL + "/coupons", credentials: 'include' }),
    endpoints: (builder) => ({

        getAllCoupons: builder.query({
            query: () => "/get-all-coupons",
        }),
        getCouponById: builder.query({
            query: (id) => `/get-coupon-by-id/${id}`
        }),
        addCoupon: builder.mutation({
            query: (body) => ({
                url: "/add-coupon",
                method: "POST",
                body,
            }),
        }),
        updateCoupon: builder.mutation({
            query: ({ id, body }) => ({
                url: `/update-coupon/${id}`,
                method: "PUT",
                body,
            }),
        }),
        deleteCoupon: builder.mutation({
            query: (id) => ({
                url: `/delete-coupon/${id}`,
                method: "DELETE",
            }),
        })

    }),
});

export const { useGetAllCouponsQuery, useGetCouponByIdQuery, useAddCouponMutation, useUpdateCouponMutation, useDeleteCouponMutation } = couponSlice;


