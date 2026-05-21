import { useCallback } from "react";
import { useCategoryData } from "./useCategoryData";
import { RootState } from "../store/store";
import { setTrendingMovies } from "../store";
import { TrendingCategory, Movie } from "../types/trending";

export default function useTrendingMovies(activeCategory: TrendingCategory) {
  const setTrendingCategory = useCallback(
    ({ category, items }: { category: TrendingCategory; items: Movie[] }) =>
      setTrendingMovies({ category, movies: items }),
    []
  );

  return useCategoryData<TrendingCategory, Movie>(
    (state: RootState) => state.movies,
    setTrendingCategory,
    import.meta.env.VITE_TMDB_TRENDING_URL,
    activeCategory
  );
}
