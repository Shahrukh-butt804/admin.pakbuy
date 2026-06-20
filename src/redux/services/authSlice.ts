import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../../constants/api';
import { prepareHeaders } from "../prepareHeader/preapareHeader";

export const authSlice = createApi({
    reducerPath: 'authSlice',
    baseQuery: fetchBaseQuery({ baseUrl: BASE_URL + "/auth", credentials: 'include' , prepareHeaders }),
    tagTypes: ['Auth'],
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (body) => ({
                url: "/login",
                method: "POST",
                body: {
                    ...body,
                    role: "admin"
                },
            }),
        }),

        ForgetPassword: builder.mutation({
            query: (body) => ({
                url: "/forgot-password",
                method: "POST",
                  body: {
                    ...body,
                    role: "admin"
                },
            }),
        }),
        verifyOtp: builder.mutation({
            query: (body) => ({
                url: "/verify-otp",
                method: "POST",
                  body: {
                    ...body,
                    role: "admin"
                },
            }),
        }),
        resetPassword: builder.mutation({
            query: (body) => ({
                url: "/reset-password",
                method: "POST",
                  body: {
                    ...body,
                    role: "admin"
                },
            }),
        }),
        logout: builder.mutation({
            query: () => ({
                url: "/logout",
                method: "POST",
            }),
        }),
        changePassword: builder.mutation({
            query: (body) => ({
                url: "/change-password",
                method: "POST",
                body,
            }),
        }),

        register: builder.mutation({
            query: (body) => ({
                url: "/register",
                method: "POST",
                body,
            }),
        }),
    }),
})

export const {
    useLoginMutation,
    useLogoutMutation,
    useForgetPasswordMutation,
    useVerifyOtpMutation,
    useResetPasswordMutation,
    useChangePasswordMutation,
    useRegisterMutation
} = authSlice
