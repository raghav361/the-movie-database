import { useCallback } from "react";
import { useCategoryData } from "./useCategoryData";
import { RootState } from "../store/store";
import { setPopularShows } from "../store";
import { PopularCategory, Show } from "../types/popular";

export default function usePopularShows(activeCategory: PopularCategory) {
  const setPopularCategory = useCallback(
    ({ category, items }: { category: PopularCategory; items: Show[] }) =>
      setPopularShows({ category, shows: items }),
    []
  );

  return useCategoryData<PopularCategory, Show>(
    (state: RootState) => state.popular,
    setPopularCategory,
    import.meta.env.VITE_TMDB_POPULAR_URL,
    activeCategory
  );
}
