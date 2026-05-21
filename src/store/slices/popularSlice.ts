import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Show, PopularCategory } from "../../types/popular";

interface PopularState {
  airing_today: Show[],
  on_the_air: Show[],
  popular: Show[],
  top_rated: Show[],
}

const initialState: PopularState = {
  airing_today: [],
  on_the_air: [],
  popular: [],
  top_rated: [],
};

const popularSlice = createSlice({
  name: "popular",
  initialState,
  reducers: {
    setPopularShows: (
      state,
      action: PayloadAction<{ category: PopularCategory; shows: Show[] }>
    ) => {
      const { category, shows } = action.payload;
      state[category] = shows;
    },
  },
});

export const { setPopularShows } = popularSlice.actions;
export default popularSlice.reducer;
