export type Show = {
  id: number;
  original_name: string;
  poster_path: string;
  backdrop_path: string
  first_air_date: string;
  vote_average: number;
  overview: string;
};

export const popularOptions = [
  { label: "Streaming", value: "airing_today" },
  { label: "On TV", value: "on_the_air" },
  { label: "Popular", value: "popular" },
  { label: "Top Rated", value: "top_rated" },
] as const;

export type PopularCategory = (typeof popularOptions)[number]['value'];