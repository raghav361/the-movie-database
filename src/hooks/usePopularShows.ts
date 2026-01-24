import { useCategoryData } from "./useCategoryData";
import { RootState } from "../store/store";
import { setPopularShows } from "../store";
import { PopularCategory, Show } from "../types/popuplar";

export default function usePopularShows(activeCategory: PopularCategory) {
  return useCategoryData<PopularCategory, Show>(
    (state: RootState) => state.popular,
    ({ category, items }) => setPopularShows({ category, shows: items }),
    import.meta.env.VITE_TMDB_POPULAR_URL,
    activeCategory
  );
}
