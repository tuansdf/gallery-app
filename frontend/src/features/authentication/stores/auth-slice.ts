import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "/src/app/store";
import { UserLogin } from "/src/features/authentication/types";

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
    setCredentials: (state, action) => {
      const { token, ...user } = action.payload;
      state.user = user;
      state.token = token;
    },
    logout: (state, action) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const selectCurrentUser = (state: RootState) => state.auth.user;
export const selectCurrentToken = (state: RootState) => state.auth.token;

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;
