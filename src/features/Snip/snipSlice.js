import { createSlice } from "@reduxjs/toolkit";
import { SLICES } from "../../constants/redux";
import { STORAGE_KEYS } from "../../constants/storage";

const initialState = {
  snips: localStorage.getItem(STORAGE_KEYS.SNIPS)
    ? JSON.parse(localStorage.getItem(STORAGE_KEYS.SNIPS))
    : [],
};

export const snipSlice = createSlice({
  name: SLICES.SNIP,
  initialState,
  reducers: {
    addSnip: (state, action) => {},
    updateSnip: (state, action) => {},
    removeAllSnips: (state, action) => {},
    removeSnip: (state, action) => {},
  },
});

export const { addSnip, updateSnip, removeAllSnips, removeSnip } =
  snipSlice.actions;

export default snipSlice.reducer;
