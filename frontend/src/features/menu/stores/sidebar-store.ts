import { create } from "zustand";

interface StoreState {
  isSidebarOpen: boolean;
  actions: {
    openSidebar: () => void;
    closeSidebar: () => void;
    toggleSidebar: () => void;
  };
}

const useSidebarStore = create<StoreState>()((set) => ({
  isSidebarOpen: false,
  actions: {
    openSidebar: () =>
      set({
        isSidebarOpen: true,
      }),

    closeSidebar: () =>
      set({
        isSidebarOpen: false,
      }),
    toggleSidebar: () =>
      set((state) => ({
        isSidebarOpen: !state.isSidebarOpen,
      })),
  },
}));

export const useIsSidebarOpen = () =>
  useSidebarStore((state) => state.isSidebarOpen);

export const useSidebarActions = () =>
  useSidebarStore((state) => state.actions);
