import { useCategoryData } from "./useCategoryData";
import { RootState } from "../store/store";
import { setTrendingMovies } from "../store";
import { TrendingCategory, Movie } from "../types/trending";

export default function useTrendingMovies(activeCategory: TrendingCategory) {
  return useCategoryData<TrendingCategory, Movie>(
    (state: RootState) => state.movies,
    ({ category, items }) => setTrendingMovies({ category, movies: items }),
    import.meta.env.VITE_TMDB_TRENDING_URL,
    activeCategory
  );
}
