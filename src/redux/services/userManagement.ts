import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../constants/api";

export const userManagementSlice = createApi({
    reducerPath: "userManagementSlice",
    baseQuery: fetchBaseQuery({ baseUrl: BASE_URL + "/admin/user-management", credentials: 'include' }),
    tagTypes: ["User"],
    endpoints: (builder) => ({
        getReport: builder.query({
            query: () => "/get-report",
        }),
        getAllUsers: builder.query({
            query: ({ page, limit, keyword }) => ({
                url: "/get-all-users",
                method: "GET",
                params: {
                    page,
                    limit,
                    keyword
                }
            })

        }),
        getUserById: builder.query({
            query: (id) => `/get-user-by-id/${id}`,
            transformResponse: (response: any) => response?.user,
            providesTags: ["User"],

        }),
        toggleUserStatus: builder.mutation({
            query: ({ id }) => ({
                url: `/toggle-user-status/${id}`,
                method: "PUT",
            }),
            invalidatesTags: ["User"],
        })
    }),
});

export const { useGetReportQuery, useGetAllUsersQuery, useGetUserByIdQuery, useToggleUserStatusMutation } = userManagementSlice;


