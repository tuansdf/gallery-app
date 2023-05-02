import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { RootState } from "@/app/store";

export type SliceState = {
  isSidebarOpen: boolean;
};

const initialState: SliceState = {
  isSidebarOpen: true,
};

const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    openSidebar: (state, _action: PayloadAction<void>) => {
      state.isSidebarOpen = true;
    },
    closeSidebar: (state, _action: PayloadAction<void>) => {
      state.isSidebarOpen = false;
    },
    toggleSidebar: (state, _action: PayloadAction<void>) => {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
  },
});

export const selectIsSidebarOpen = (state: RootState) =>
  state.menu.isSidebarOpen;

export const { openSidebar, closeSidebar, toggleSidebar } = menuSlice.actions;

export default menuSlice.reducer;
