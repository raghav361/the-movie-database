import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

import API_OPTIONS from "../config";
import { setBackdrop, setLatestTrailers } from "../store";
import { AppDispatch } from "../store/store";
import { Trailer } from "../types/latest";
import { Movie, TrendingCategory } from "../types/trending";

/**
 * Fetch trailers for a given category (now_playing, upcoming, etc.)
 */
const fetchTrailersForCategory = async (category: TrendingCategory): Promise<Trailer[]> => {
  try {
    const moviesRes = await fetch(`${import.meta.env.VITE_TMDB_TRENDING_URL}${category}?language=en-US&page=1`, API_OPTIONS);

    const moviesData = await moviesRes.json();

    // Parallel fetching for movie trailers
    const trailerPromises = moviesData.results.map(async (movie: Movie) => {
      const res = await fetch(`https://api.themoviedb.org/3/movie/${movie.id}/videos`, API_OPTIONS);
      const data = await res.json();

      const trailer = data.results.find((v: Trailer) => v.type === "Trailer" && v.site === "YouTube");

      if (trailer) {
        return {
          id: trailer.id,
          title: movie.title,
          youtubeKey: trailer.key,
          thumbnail: `https://img.youtube.com/vi/${trailer.key}/mqdefault.jpg`,
          backdrop_path: movie.backdrop_path,
        } as Trailer;
      }

      return null;
    });

    const results = await Promise.all(trailerPromises);
    return results.filter(Boolean) as Trailer[];
  } catch (error) {
    console.error(`Failed to fetch trailers for ${category}:`, error);
    return [];
  }
};

/**
 * Custom hook using React Query for caching + Redux for backdrop state
 */
export const useLatestTrailers = (category: TrendingCategory) => {
  const dispatch = useDispatch<AppDispatch>();

  const query = useQuery<Trailer[], Error>({
    queryKey: ["latestTrailers", category],
    queryFn: () => fetchTrailersForCategory(category),
    staleTime: 1000 * 60 * 10, // 10 min fresh
    gcTime: 1000 * 60 * 15, // 15 min cached in memory
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  // Sync data to Redux only once fetched successfully
  useEffect(() => {
    if (query.data && query.data.length > 0) {
      dispatch(setLatestTrailers({ category, trailers: query.data }));
      dispatch(
        setBackdrop({
          category,
          backdrop: query.data[0].backdrop_path ?? null,
        })
      );
    }
  }, [query.data, category, dispatch]);

  return {
    data: query.data ?? [],
    isLoading: query.isLoading,
    error: query.error,
  };
};

export default useLatestTrailers;
