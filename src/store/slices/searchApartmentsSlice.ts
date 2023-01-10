import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchedApartments: [],
};

const searchApartmentsSlice = createSlice({
  name: "apartments",
  initialState,
  reducers: {
    setApartments(state, action) {
      state.searchedApartments = action.payload.searchedApartments;
    },
  },
});

export const { setApartments } = searchApartmentsSlice.actions;

export default searchApartmentsSlice.reducer;
