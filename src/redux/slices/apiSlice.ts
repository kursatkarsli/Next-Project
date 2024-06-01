// redux/slices/apiSlice.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { cookies } from "next/headers";

interface User {
  _id: string;
  email: string;
  code: string;
  expireDate: string;
  role: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface LoginResponse {
  message: string;
  token: string;
  user: User;
}

interface Package {
  _id: string;
  imagePath: string;
  name: string;
  details: string[];
  tags: string[];
  amount: number;
  currency: string;
  moreInformation: string;
  price: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface PackagesResponse {
  allPackages: Package[];
}

interface ContractResponse {
  content: string;
}

const baseQuery = fetchBaseQuery({
  baseUrl: "https://caseapi-fe.paramtech.com.tr/api",
  prepareHeaders: (headers) => {
    const token = localStorage.getItem("token");
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery,
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, { email: string; code: string }>({
      query: (credentials) => ({
        url: "auth/sign-in",
        method: "POST",
        body: credentials,
      }),
    }),
    getPackages: builder.query<PackagesResponse, void>({
      query: () => ({
        url: "packages",
      }),
    }),
    getPackageDetails: builder.query<Package, string>({
      query: (id) => ({
        url: `packages/${id}`,
      }),
    }),
    getContract: builder.query<ContractResponse, void>({
      query: () => ({
        url: "payment",
      }),
    }),
    checkout: builder.mutation<void, { paymentDetails: any }>({
      query: (paymentDetails) => ({
        url: "payment",
        method: "POST",
        body: paymentDetails,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useGetPackagesQuery,
  useGetPackageDetailsQuery,
  useGetContractQuery,
  useCheckoutMutation,
} = apiSlice;
