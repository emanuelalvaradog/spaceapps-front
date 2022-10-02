import { configureStore } from "@reduxjs/toolkit";
import { imagesSlice } from "./slices/imagesSlice";

export const store = configureStore({
  reducer: { images: imagesSlice.reducer },
});
