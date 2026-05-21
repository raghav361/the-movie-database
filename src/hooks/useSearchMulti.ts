import { useQuery } from "@tanstack/react-query";
import API_OPTIONS from "../config";
import { SearchResult } from "../types/search";

async function fetchSearchResults(query: string): Promise<SearchResult[]> {
  const encodedQuery = encodeURIComponent(query);
  const response = await fetch(
    `https://api.themoviedb.org/3/search/multi?query=${encodedQuery}&include_adult=false&language=en-US&page=1`,
    API_OPTIONS
  );

  if (!response.ok) {
    throw new Error(`Search request failed with status ${response.status}`);
  }

  const data = await response.json();
  const results = Array.isArray(data.results) ? data.results : [];
  const uniqueResults = new Map<string, SearchResult>();

  results.forEach((item: SearchResult) => {
    if (
      item.media_type === "movie" ||
      item.media_type === "tv" ||
      item.media_type === "person"
    ) {
      uniqueResults.set(`${item.media_type}-${item.id}`, item);
    }
  });

  return Array.from(uniqueResults.values());
}

export default function useSearchMulti(query: string) {
  return useQuery<SearchResult[], Error>({
    queryKey: ["searchMulti", query],
    queryFn: () => fetchSearchResults(query),
    enabled: query.length >= 2,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
}
