import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import API_OPTIONS from "../config";

/**
 * Generic hook for fetching and caching category-based data
 * (e.g. Trending movies, Popular shows)
 */
export function useCategoryData<TCategory extends string, TItem>(
  sliceSelector: (state: RootState) => Record<TCategory, TItem[]>,
  setAction: (payload: { category: TCategory; items: TItem[] }) => any,
  endpointBase: string,
  activeCategory: TCategory
) {
  const dispatch = useDispatch<AppDispatch>();
  const data = useSelector(sliceSelector);

  useEffect(() => {
    // If already cached, skip fetching
    if (data[activeCategory] && data[activeCategory].length > 0) return;

    const controller = new AbortController();

    const fetchData = async () => {
      try {
        const res = await fetch(
          `${endpointBase}${activeCategory}?language=en-US&page=1`,
          { ...API_OPTIONS, signal: controller.signal }
        );
        const json = await res.json();

        dispatch(setAction({ category: activeCategory, items: json.results ?? [] }));
      } catch (error) {
        if ((error as Error).name !== "AbortError") {
          console.error(`Failed to fetch ${String(activeCategory)}:`, error);
        }
      }
    };

    fetchData();

    return () => controller.abort();
  }, [activeCategory, dispatch, endpointBase, data]);

  return data;
}

export default useCategoryData;
