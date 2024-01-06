import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  GeographyData,
  OverAllStat,
  Product,
  Transactions,
  User,
} from "../../types";

interface TransactionsQuery {
  page?: number;
  pageSize?: number;
  sort?: string;
  search?: string;
}

export const api = createApi({
  reducerPath: "adminApi",
  tagTypes: [
    "User",
    "Products",
    "Customers",
    "Transactions",
    "Geography",
    "Sales",
  ],
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
    getTransactions: builder.query<
      { transactions: Transactions[]; total: number },
      TransactionsQuery
    >({
      query: ({ page, pageSize, sort, search }) => ({
        url: "client/transactions",
        method: "GET",
        params: { page, pageSize, sort, search },
      }),
      providesTags: ["Transactions"],
    }),
    getGeographyData: builder.query<GeographyData[], undefined>({
      query: () => "/client/geography",

      providesTags: ["Geography"],
    }),
    getSales: builder.query<OverAllStat, undefined>({
      query: () => "/sales",
      providesTags: ["Sales"],
    }),
  }),
});

export const {
  useGetUserQuery,
  useGetProductsQuery,
  useGetCustomersQuery,
  useGetTransactionsQuery,
  useGetGeographyDataQuery,
  useGetSalesQuery,
} = api;
