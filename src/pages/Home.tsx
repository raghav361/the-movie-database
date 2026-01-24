import { useState, lazy, Suspense } from "react";

import Navbar from "../components/layouts/Navbar";
import Footer from "../components/layouts/Footer";
import Hero from "../components/sections/Hero";
import SearchBar from "../components/layouts/SearchBar";
import ReusableSection from "../components/common/ReusableSection";
import ReusableCard from "../components/common/ReusableCard";

import useTrendingMovies from "../hooks/useTrendingMovies";
import usePopularShows from "../hooks/usePopularShows";

import { trendingOptions, TrendingCategory, Movie } from "../types/trending";
import { popularOptions, PopularCategory, Show } from "../types/popuplar";

const LatestTrailers = lazy(() => import("../components/sections/LatestTrailers"));

/**
 * Home Page
 * ----------
 * Displays: Hero, Trending Section, Latest Trailers, What's Popular Section.
 * Uses reusable hooks and components for clean data fetching + layout reuse.
 */
const Home = () => {
  // === State ===
  const [activeTrending, setActiveTrending] = useState<TrendingCategory>("now_playing");
  const [activePopular, setActivePopular] = useState<PopularCategory>("airing_today");

  // === Data hooks ===
  const trending = useTrendingMovies(activeTrending);
  const popular = usePopularShows(activePopular);

  // === Render ===
  return (
    <>
      <Navbar />
      <SearchBar />

      {/* Hero Section */}
      <Suspense fallback={null}>
        <Hero movies={trending[activeTrending] ?? []} />
      </Suspense>

      {/* Trending Movies Section */}
      <ReusableSection
        title="Trending"
        options={trendingOptions}
        activeCategory={activeTrending}
        setActiveCategory={setActiveTrending}
        data={trending}
        section="movies"
        skeletonType="portrait"
        skeletonCount={6}
        renderItem={(movie: Movie) => (
          <ReusableCard key={movie.id} item={movie} type="movie" />
        )}
      />

      {/* Latest Trailers */}
      <Suspense fallback={null}>
        <LatestTrailers />
      </Suspense>

      {/* What's Popular Section */}
      <ReusableSection
        title="What’s Popular"
        options={popularOptions}
        activeCategory={activePopular}
        setActiveCategory={setActivePopular}
        data={popular}
        section="movies"
        skeletonType="portrait"
        skeletonCount={6}
        renderItem={(show: Show) => (
          <ReusableCard key={show.id} item={show} type="show" />
        )}
      />

      <Footer />
    </>
  );
};

export default Home;
