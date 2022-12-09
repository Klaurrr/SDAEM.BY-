import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import newsReducer from "./slices/newsSlice";

export const store = configureStore({
  reducer: {
    // filter: filterReducer,
    newsReducer,
    user: userReducer,
  },
});
