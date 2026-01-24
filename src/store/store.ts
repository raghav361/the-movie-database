import { configureStore } from '@reduxjs/toolkit';
import moviesSlice from "./slices/trendingSlice"
import popularSlice from "./slices/popularSlice";
import latestSlice from './slices/latestSlice';

export const store = configureStore({
  reducer: {
    movies: moviesSlice,
    popular: popularSlice,
    latest: latestSlice
  },
});

// ReturnType - Returns the type of the function
// typeof - Get the type of getState from store object
export type RootState = ReturnType<typeof store.getState>;
// typeof - Get the type of dispatch from store object
// typeof useDispatch<AppDispatch>()
export type AppDispatch = typeof store.dispatch;
