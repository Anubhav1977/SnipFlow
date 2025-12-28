import { createSlice } from "@reduxjs/toolkit";
import { STORAGE_KEYS } from "../../constants/storage";
import { SLICES } from "../../constants/keys";
import toast from "react-hot-toast";

const initialState = {
  snips: localStorage.getItem(STORAGE_KEYS.SNIPS)
    ? JSON.parse(localStorage.getItem(STORAGE_KEYS.SNIPS))
    : [],
};

export const snipSlice = createSlice({
  name: SLICES.SNIP,
  initialState,
  reducers: {
    addSnip: (state, action) => {
      const snip = action.payload;
     
      state.snips.push(snip);
      localStorage.setItem(STORAGE_KEYS.SNIPS, JSON.stringify(state.snips));
      toast.success("Snip created successfully!");
    },

    getSnip : (state, action) =>{
      const snipId = action.payload;
      const snip = state.snips.filter((item) => item._id === snipId);
      return snip;
    },

    updateSnip: (state, action) => {
      const snip = action.payload;
      const index = state.snips.findIndex((item) => item._id === snip._id);

      if(index >= 0){
        state.snips[index] = snip;
        localStorage.setItem(STORAGE_KEYS.SNIPS, JSON.stringify(state.snips));
        toast.success("Snip updated successfully!");
      }
    },

    removeAllSnips: (state) => {
      state.snips = [];
      localStorage.removeItem(STORAGE_KEYS.SNIPS);
      toast.success("All snips removed successfully!");
    },

    removeSnip: (state, action) => {
      const snipId = action.payload;
      const index = state.snips.findIndex((item) => item._id === snipId);

      if(index >= 0){
        state.snips.splice(index, 1);
        localStorage.setItem(STORAGE_KEYS.SNIPS, JSON.stringify(state.snips));
        toast.success("Snip deleted successfully!");
      }
    },
  },
});

export const { addSnip, updateSnip, removeAllSnips, removeSnip } =
  snipSlice.actions;

export default snipSlice.reducer;
