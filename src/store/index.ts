import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import dataReducer from "./slices/dataSlice";
import searchApartmentsReducer from "./slices/searchApartmentsSlice";
import bookMarksReducer from "./slices/bookMarksSlice";

export const store = configureStore({
  reducer: {
    bookMarks: bookMarksReducer,
    search: searchApartmentsReducer,
    data: dataReducer,
    user: userReducer,
  },
});
