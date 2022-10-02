import { createSlice } from "@reduxjs/toolkit";

export const imagesSlice = createSlice({
  name: "images",
  initialState: {
    images: [],
    uid: "",
    loading: true,
    error: false,
  },
  reducers: {
    setImages(state, { payload }) {
      (state.images = payload.images),
        (state.uid = payload.uid),
        (state.loading = payload.loading),
        (state.error = payload.error);
    },
  },
});

export const { setImages } = imagesSlice.actions;
