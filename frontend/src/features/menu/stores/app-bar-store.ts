import { create } from "zustand";

interface StoreState {
  appBarTitle: string;
  actions: {
    setAppBarTitle: (title: string) => void;
  };
}

const useAppBarStore = create<StoreState>()((set) => ({
  appBarTitle: "",
  actions: {
    setAppBarTitle: (title) =>
      set({
        appBarTitle: title,
      }),
  },
}));

export const useAppBarTitle = () =>
  useAppBarStore((state) => state.appBarTitle);

export const useAppBarActions = () => useAppBarStore((state) => state.actions);
