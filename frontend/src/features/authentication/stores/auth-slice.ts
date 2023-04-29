import { RootState } from "@/app/store";
import { UserLogin, UserLoginWithToken } from "@/features/authentication/types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: SliceState = {
  user: null,
  token: null,
};

export type SliceState = {
  user: UserLogin | null;
  token: string | null;
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<UserLoginWithToken>) => {
      const { token, ...user } = action.payload;
      state.user = user;
      state.token = token;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const selectCurrentUser = (state: RootState) => state.auth.user;
export const selectCurrentToken = (state: RootState) => state.auth.token;

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;
