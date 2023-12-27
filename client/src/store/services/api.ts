import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Product, User } from "../../types";

export const api = createApi({
  reducerPath: "adminApi",
  tagTypes: ["User", "Products", "Customers"],
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/" }),
  endpoints: (builder) => ({
    getUser: builder.query<User, string>({
      query: (userId: string) => `general/user/${userId}`,
      providesTags: ["User"],
    }),
    getProducts: builder.query<Product[], undefined>({
      query: () => "/client/products/",
      providesTags: ["Products"],
    }),
    getCustomers: builder.query<User[], undefined>({
      query: () => "/client/customers/",
      providesTags: ["Customers"],
    }),
  }),
});

export const { useGetUserQuery, useGetProductsQuery, useGetCustomersQuery } =
  api;
