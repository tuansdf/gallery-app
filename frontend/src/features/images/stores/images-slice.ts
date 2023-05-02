import { RootState } from "@/app/store";
import { createSlice } from "@reduxjs/toolkit";

const initialState: SliceState = {
  isImageDetailOpening: false,
  imageDetailIndex: undefined,
  lastImageIndex: 0,
};

export type SliceState = {
  isImageDetailOpening: boolean;
  imageDetailIndex?: number;
  lastImageIndex: number;
};

const imageSlice = createSlice({
  name: "images",
  initialState,
  reducers: {
    onImageClick: (state, action) => {
      const { imageIndex } = action.payload;
      state.isImageDetailOpening = true;
      state.imageDetailIndex = imageIndex;
    },
    onCloseImage: (state, action) => {
      state.isImageDetailOpening = false;
    },
    onNextImage: (state, action) => {
      let tmp = (state.imageDetailIndex || 0) + 1;
      if (tmp > state.lastImageIndex) {
        tmp = 0;
      }
      state.imageDetailIndex = tmp;
    },
    onPrevImage: (state, action) => {
      let tmp = (state.imageDetailIndex || 0) - 1;
      if (tmp < 0) {
        tmp = state.lastImageIndex;
      }
      state.imageDetailIndex = tmp;
    },
    onFetchImagesSuccess: (state, action) => {
      const { lastImageIndex } = action.payload;
      state.lastImageIndex = lastImageIndex;
    },
  },
});

export const selectIsImageDetailOpening = (state: RootState) =>
  state.image.isImageDetailOpening;
export const selectImageDetailIndex = (state: RootState) =>
  state.image.imageDetailIndex;

export const {
  onImageClick,
  onFetchImagesSuccess,
  onNextImage,
  onPrevImage,
  onCloseImage,
} = imageSlice.actions;

export default imageSlice.reducer;
