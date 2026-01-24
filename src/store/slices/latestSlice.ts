import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Trailer } from "../../types/latest";
import { TrendingCategory } from "../../types/trending";

interface LatestState {
  now_playing: Trailer[];
  upcoming: Trailer[];
  backdrops: Record<TrendingCategory, string | null>;
}

const initialState: LatestState = {
  now_playing: [],
  upcoming: [],
  backdrops: {
    now_playing: null,
    upcoming: null,
  },
};

const latestSlice = createSlice({
  name: "latest",
  initialState,
  reducers: {
    /**
     * Stores fetched trailers for the given category.
     * Data is hydrated by React Query, but cached here for UI access.
     */
    setLatestTrailers: (
      state,
      action: PayloadAction<{ category: TrendingCategory; trailers: Trailer[] }>
    ) => {
      const { category, trailers } = action.payload;
      state[category] = trailers;
    },

    /**
     * Updates backdrop image for the active category (hover or first trailer).
     */
    setBackdrop: (
      state,
      action: PayloadAction<{ category: TrendingCategory; backdrop: string | null }>
    ) => {
      const { category, backdrop } = action.payload;
      state.backdrops[category] = backdrop;
    },

    /**
     * Clears all cached data (useful if implementing a refresh later).
     */
    resetLatestState: () => initialState,
  },
});

export const { setLatestTrailers, setBackdrop, resetLatestState } = latestSlice.actions;
export default latestSlice.reducer;
