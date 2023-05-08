import { create } from "zustand";

interface StoreState {
  isImageDetailOpening: boolean;
  currentOpeningImageIndex: number;
  lastImageIndex: number;
  actions: {
    openImage: (imageIndex: number) => void;
    nextImage: () => void;
    previousImage: () => void;
    closeImage: () => void;
    fetchingImagesSuccessful: (lastImageIndex: number) => void;
  };
}

const useImageDetailStore = create<StoreState>()((set) => ({
  isImageDetailOpening: false,
  currentOpeningImageIndex: 0,
  lastImageIndex: 0,
  actions: {
    openImage: (imageIndex) =>
      set({
        isImageDetailOpening: true,
        currentOpeningImageIndex: imageIndex,
      }),
    closeImage: () =>
      set({
        isImageDetailOpening: false,
      }),
    nextImage: () =>
      set((state) => {
        let tmp = state.currentOpeningImageIndex + 1;
        if (tmp > state.lastImageIndex) tmp = 0;

        return { currentOpeningImageIndex: tmp };
      }),
    previousImage: () =>
      set((state) => {
        let tmp = state.currentOpeningImageIndex - 1;
        if (tmp < 0) tmp = state.lastImageIndex;

        return { currentOpeningImageIndex: tmp };
      }),
    fetchingImagesSuccessful: (lastImageIndex) => {
      set({ lastImageIndex });
    },
  },
}));

export const useIsImageDetailOpening = () =>
  useImageDetailStore((state) => state.isImageDetailOpening);
export const useCurrentOpeningImageIndex = () =>
  useImageDetailStore((state) => state.currentOpeningImageIndex);
export const useLastImageIndex = () =>
  useImageDetailStore((state) => state.lastImageIndex);

export const useImageDetailActions = () =>
  useImageDetailStore((state) => state.actions);
