import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  //   news: null,
  //   date: null,
  //   id: null,
  news: [],
};

const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {
    setNews(state, action) {
      state.news = [...state.news].concat(action.payload.news);
      //   state.news = [...state.news].includes(action.payload.news)
      //     ? [...state.news]
      //     : [...state.news].concat(action.payload.news);
    },
  },
});

export const { setNews } = newsSlice.actions;

export default newsSlice.reducer;
