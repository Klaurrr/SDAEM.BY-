import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import dataReducer from "./slices/dataSlice";
import searchApartmentsReducer from "./slices/searchApartmentsSlice";

export const store = configureStore({
  reducer: {
    // filter: filterReducer,
    search: searchApartmentsReducer,
    data: dataReducer,
    user: userReducer,
  },
});
