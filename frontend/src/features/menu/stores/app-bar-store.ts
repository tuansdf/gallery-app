import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { RootState } from "@/app/store";

export type SliceState = {
  title: string;
};

const initialState: SliceState = {
  title: "",
};

const appBarSlice = createSlice({
  name: "app-bar",
  initialState,
  reducers: {
    setTitle: (state, action: PayloadAction<string>) => {
      const title = action.payload;
      state.title = title;
    },
  },
});

export const selectAppBarTitle = (state: RootState) => state.appBar.title;

export const { setTitle } = appBarSlice.actions;

export default appBarSlice.reducer;
