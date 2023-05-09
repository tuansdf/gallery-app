import { create } from "zustand";
import { persist } from "zustand/middleware";

import { LoginResponse } from "@/features/authentication/api/login";
import { User } from "@/features/authentication/types/auth-types";

interface StoreState {
  user: User | null;
  refreshToken: string | null;
  accessToken: string | null;
}

const initialState: StoreState = {
  user: null,
  refreshToken: null,
  accessToken: null,
};

export const useAuthStore = create<StoreState>()(
  persist((_set) => initialState, {
    name: "auth",
  })
);

export const setAuthCredentials = (data: LoginResponse) =>
  useAuthStore.setState((_state) => {
    const { refreshToken, accessToken, user } = data;
    return { user, refreshToken, accessToken };
  });

export const authLogout = () => useAuthStore.setState(initialState);

export const useAuthUser = () => useAuthStore((state) => state.user);
export const useAuthRefreshToken = () =>
  useAuthStore((state) => state.refreshToken);
export const useAuthAccessToken = () =>
  useAuthStore((state) => state.accessToken);
