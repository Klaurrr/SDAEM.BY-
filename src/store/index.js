import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import dataReducer from "./slices/dataSlice";

export const store = configureStore({
  reducer: {
    // filter: filterReducer,
    data: dataReducer,
    user: userReducer,
  },
});
