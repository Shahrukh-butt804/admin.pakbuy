import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../constants/api";

export const emailSlice = createApi({
    reducerPath: "emailSlice",
    baseQuery: fetchBaseQuery({ baseUrl: BASE_URL + "/email-management", credentials: 'include' }),
    tagTypes: ['EmailTemplate'],
    endpoints: (builder) => ({
        getEmailTemplate: builder.query({
            query: () => "/get-email-template",
            transformResponse: (response: any) => response.template[0],
            providesTags: ['EmailTemplate'],
        }),
        updateEmailTemplate: builder.mutation({
            query: ({ id, body }) => ({
                url: `/update-email-template/${id}`,
                method: "PUT",
                body,
            }),
            invalidatesTags: ['EmailTemplate'],
        }),

    }),
});

export const { useGetEmailTemplateQuery, useUpdateEmailTemplateMutation } = emailSlice;


