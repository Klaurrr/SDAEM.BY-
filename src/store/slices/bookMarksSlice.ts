import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  bookMarks: [],
};

const bookMarksSlice = createSlice({
  name: "bookMarks",
  initialState,
  reducers: {
    setBookMarks(state, action) {
      state.bookMarks = [...state.bookMarks].concat(action.payload.bookMarks);
    },
  },
});

export const { setBookMarks } = bookMarksSlice.actions;

export default bookMarksSlice.reducer;
