import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  DashboardData,
  GeographyData,
  OverAllStat,
  Product,
  Transactions,
  User,
  UserWithStats,
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
    "Admins",
    "Performance",
    "Dashboard",
  ],
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
  }),

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
    getAdmins: builder.query<User[], undefined>({
      query: () => "/management/admins",
      providesTags: ["Admins"],
    }),
    getUserPerformance: builder.query<UserWithStats, string>({
      query: (id: string) => `/management/performance/${id}`,
      providesTags: ["Performance"],
    }),
    getDashboard: builder.query<DashboardData, undefined>({
      query: () => "/general",
      providesTags: ["Dashboard"],
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
  useGetAdminsQuery,
  useGetUserPerformanceQuery,
  useGetDashboardQuery,
} = api;
