import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  ville: "",
};


const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {

    setVille(state, action) {
      state.ville = action.payload;
    },
  },
});

export const { setVille } = weatherSlice.actions;

export default weatherSlice.reducer;
