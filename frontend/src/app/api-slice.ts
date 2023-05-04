import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { useAuthStore } from "@/features/authentication/stores/auth-store";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";

const baseQuery = fetchBaseQuery({
  baseUrl: API_BASE_URL + "/api/v1",
  prepareHeaders: (headers: Headers, { getState }: any) => {
    const token = useAuthStore.getState().token;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ["Album", "User", "Image"],
  endpoints: () => ({}),
});
