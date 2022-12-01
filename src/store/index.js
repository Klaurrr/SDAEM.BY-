import { configureStore } from "@reduxjs/toolkit";
import filterReducer from "./slices/filterSlice";
import userReducer from "./slices/userSlice";

export const store = configureStore({
  reducer: {
    // filter: filterReducer,
    user: userReducer,
  },
});
