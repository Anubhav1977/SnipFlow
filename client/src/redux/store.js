import { configureStore } from "@reduxjs/toolkit";
import snipReducer from "../features/Snip/snipSlice";
import { SLICES } from "../constants/keys";

export const store = configureStore({
  reducer: {
    [SLICES.SNIPS]: snipReducer,
  },
});
