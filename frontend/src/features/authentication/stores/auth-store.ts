import { create } from "zustand";
import { persist } from "zustand/middleware";

import {
  UserLogin,
  UserLoginWithToken,
} from "@/features/authentication/types/auth-types";

interface StoreState {
  user: UserLogin | null;
  token: string | null;
}

export const useAuthStore = create<StoreState>()(
  persist(
    (_set) => ({
      user: null,
      token: null,
    }),
    {
      name: "auth",
    }
  )
);

export const setAuthCredentials = (data: UserLoginWithToken) =>
  useAuthStore.setState((_state) => {
    const { token, ...user } = data;
    return { user, token };
  });

export const authLogout = () =>
  useAuthStore.setState({
    token: null,
    user: null,
  });

export const useAuthUser = () => useAuthStore((state) => state.user);
export const useAuthToken = () => useAuthStore((state) => state.token);
