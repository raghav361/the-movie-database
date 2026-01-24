import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Movie, TrendingCategory } from "../../types/trending";

interface TrendingState {
  now_playing: Movie[],
  upcoming: Movie[],
}

const initialState: TrendingState = {
  now_playing: [],
  upcoming: [],
};

const trendingSlice = createSlice({
  name: "trending",
  initialState,
  reducers: {
    setTrendingMovies: (
      state,
      action: PayloadAction<{ category: TrendingCategory; movies: Movie[] }>
    ) => {
      const { category, movies } = action.payload;
      state[category] = movies;
    },
  },
});

export const { setTrendingMovies } = trendingSlice.actions;
export default trendingSlice.reducer;
