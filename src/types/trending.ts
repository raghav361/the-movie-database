export type Movie = {
  id: number;
  title: string;
  poster_path: string;
  backdrop_path: string
  release_date: string;
  vote_average: number;
  overview: string;
};

export const trendingOptions = [
  { label: "Today", value: "now_playing" },
  { label: "This Week", value: "upcoming" },
] as const;

export type TrendingCategory = (typeof trendingOptions)[number]['value'];