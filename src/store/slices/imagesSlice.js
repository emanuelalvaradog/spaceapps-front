import { createSlice } from "@reduxjs/toolkit";

export const imagesSlice = createSlice({
  name: "images",
  initialState: {
    images: [],
    uid: "",
    prompt: "",
    artist: "",
    loading: true,
    error: false,
  },
  reducers: {
    setImages(state, { payload }) {
      (state.images = payload.images),
        (state.uid = payload.uid),
        (state.prompt = payload.prompt),
        (state.artist = payload.artist),
        (state.loading = payload.loading),
        (state.error = payload.error);
    },
    setPrompt(state, { payload }) {
      (state.prompt = payload.prompt), (state.artist = payload.artist);
    },
  },
});

export const { setImages, setPrompt } = imagesSlice.actions;
