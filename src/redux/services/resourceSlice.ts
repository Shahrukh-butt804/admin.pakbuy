import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../constants/api";

export const resourceSlice = createApi({
    reducerPath: "resourceSlice",
    baseQuery: fetchBaseQuery({ baseUrl: BASE_URL + "/resource", credentials: 'include' }),
    endpoints: (builder) => ({
        getAllResources: builder.query({
            query: ({ page, limit, keyword }) => ({
                url: "/get-all-resources",
                method: "GET",
                params: {
                    page,
                    limit,
                    keyword
                }
            }),

        }),
        addResource: builder.mutation({
            query: ({name , content}) => ({
                url: "/add-resource",
                method: "POST",
                body : {name , content},
            }),
        })
    }),
});

export const { useGetAllResourcesQuery, useAddResourceMutation } = resourceSlice;


