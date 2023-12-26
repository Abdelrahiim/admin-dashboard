import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { User } from "../../types";

export const api = createApi({
  reducerPath: "adminApi",
  tagTypes: ["User"],
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/" }),
  endpoints: (builder) => ({
    getUser: builder.query<User, string>({
      query: (userId: string) => `general/user/${userId}`,
      providesTags: ["User"],
    }),
  }),
});

export const { useGetUserQuery } = api;
