import { createSlice } from "@reduxjs/toolkit";

const LowStockSlice = createSlice({
  name: "lowStock",
  initialState: [],
  reducers: {
    addLowStock: (state, action) => {
      state.push(action.payload);
    },
  },
});

export const { addLowStock } = LowStockSlice.actions;
export default LowStockSlice.reducer;
