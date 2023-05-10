import { create } from "zustand";

interface StoreState {
  isUploading: boolean;
  actions: {
    startUploading: () => void;
    finishUploading: () => void;
  };
}

export const useUploadImageStore = create<StoreState>()((set) => ({
  isUploading: false,
  actions: {
    startUploading: () =>
      set({
        isUploading: true,
      }),
    finishUploading: () =>
      set({
        isUploading: false,
      }),
  },
}));

export const useIsUploadingImage = () =>
  useUploadImageStore((state) => state.isUploading);

export const useUploadImageActions = () =>
  useUploadImageStore((state) => state.actions);
