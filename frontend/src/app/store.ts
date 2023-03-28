import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "/src/app/api-slice";
import authReducer from "/src/features/authentication/stores/auth-slice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(apiSlice.middleware);
  },
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
