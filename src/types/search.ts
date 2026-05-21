export type SearchMediaType = "movie" | "tv" | "person";

export interface SearchKnownFor {
  id: number;
  media_type?: "movie" | "tv";
  title?: string;
  name?: string;
}

export interface SearchResult {
  id: number;
  media_type: SearchMediaType;
  title?: string;
  name?: string;
  original_language?: string;
  release_date?: string;
  first_air_date?: string;
  known_for_department?: string;
  known_for?: SearchKnownFor[];
  vote_average?: number;
  poster_path?: string | null;
  profile_path?: string | null;
}
