import { createSlice } from "@reduxjs/toolkit";
import { SLICES } from "../../constants/keys";
import { createSnip, deleteSnip, fetchSnipById, fetchSnips, updateSnip } from "./snipThunk";

// const initialState = {
//   snips: localStorage.getItem(STORAGE_KEYS.SNIPS)
//     ? JSON.parse(localStorage.getItem(STORAGE_KEYS.SNIPS))
//     : [],
// };

const initialState = {
  snips : [], 
  selectedSnip: null,
  status : "idle",
  error: null
};

export const snipSlice = createSlice({
  name: SLICES.SNIPS,
  initialState,
  reducers: {
    clearSelectedSnip(state) {
      state.selectedSnip = null;
    },
    // addSnip: (state, action) => {
    //   const snip = action.payload;
     
    //   state.snips.push(snip);
    //   localStorage.setItem(STORAGE_KEYS.SNIPS, JSON.stringify(state.snips));
    //   toast.success("Snip created successfully!");
    // },

    // getSnip : (state, action) =>{
    //   const snipId = action.payload;
    //   const snip = state.snips.filter((item) => item._id === snipId);
    //   return snip;
    // },

    // updateSnip: (state, action) => {
    //   const snip = action.payload;
    //   const index = state.snips.findIndex((item) => item._id === snip._id);

    //   if(index >= 0){
    //     state.snips[index] = snip;
    //     localStorage.setItem(STORAGE_KEYS.SNIPS, JSON.stringify(state.snips));
    //     toast.success("Snip updated successfully!");
    //   }
    // },

    // removeAllSnips: (state) => {
    //   state.snips = [];
    //   localStorage.removeItem(STORAGE_KEYS.SNIPS);
    //   toast.success("All snips removed successfully!");
    // },

    // removeSnip: (state, action) => {
    //   const snipId = action.payload;
    //   const index = state.snips.findIndex((item) => item._id === snipId);

    //   if(index >= 0){
    //     state.snips.splice(index, 1);
    //     localStorage.setItem(STORAGE_KEYS.SNIPS, JSON.stringify(state.snips));
    //     toast.success("Snip deleted successfully!");
    //   }
    // },
  },
  extraReducers: (builder) =>{
    builder

      /* ========== FETCH ALL ========== */
      .addCase(fetchSnips.pending, (state) =>{
        state.status = "loading";
      })
      .addCase(fetchSnips.fulfilled, (state, action) =>{
        state.status = "succeeded";
        state.snips = action.payload;
      })
      .addCase(fetchSnips.rejected, (state, action) =>{
        state.status = "failed";
        state.error = action.payload;
      })
      
      /* ========== FETCH BY ID ========== */
      .addCase(fetchSnipById.pending, (state) =>{
        state.status = "loading";
      })
      .addCase(fetchSnipById.fulfilled, (state, action) =>{
        state.status = "succeeded";
        state.selectedSnip = action.payload;
      })
      .addCase(fetchSnipById.rejected, (state, action) =>{
        state.status = "failed";
        state.error = action.payload;
      })

      /* ========== CREATE ========== */
      .addCase(createSnip.pending, (state) =>{
        state.status = "loading";
      })
      .addCase(createSnip.fulfilled , (state, action) =>{
        state.status = "succeeded";
        state.snips.unshift(action.payload);
      })
      .addCase(createSnip.rejected, (state, action) =>{
        state.status = "failed";
        state.error = action.payload;
      })

      /* ========== UPDATE ========== */
      .addCase(updateSnip.pending, (state) =>{
        state.status = "loading";
      })
      .addCase(updateSnip.fulfilled, (state, action)=>{
        const {id, data} = action.payload;
        const index = state.snips.findIndex((s) => s.id === id);

        if(index !== -1){
          state.snips[index] = {...state.snips[index], ...data};
        }
      })
      .addCase(updateSnip.rejected, (state, action) =>{
        state.status = "failed";
        state.error = action.payload;
      })

      /* ========== DELETE ========== */
      .addCase(deleteSnip.pending, (state) =>{
        state.status = "loading";
      })
      .addCase(deleteSnip.fulfilled , (state, action) =>{
        state.snips = state.snips.filter((s)=> s.id !== action.payload);
      })
      .addCase(deleteSnip.rejected, (state, action) =>{
        state.status = "failed";
        state.error = action.payload;
      })
  }
});

export const { clearSelectedSnip } =
  snipSlice.actions;

export default snipSlice.reducer;
