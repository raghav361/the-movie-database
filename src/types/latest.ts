import { trendingOptions } from "./trending";

export type Trailer = {
  id: string;
  title: string;
  thumbnail: string;
  youtubeKey: string;
  backdrop_path?: string;
  type?: string;
  site?: string;
};

export type TrailerCategory = (typeof trendingOptions)[number]['value'];