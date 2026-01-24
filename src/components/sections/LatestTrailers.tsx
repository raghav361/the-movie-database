import { useEffect, useState } from "react";

import { TrendingCategory, trendingOptions } from "../../types/trending";
import { useAppDispatch, useAppSelector } from "../../hooks/useAppHooks";
import { setBackdrop } from "../../store";
import { useLatestTrailers } from "../../hooks/useLatestTrailers";
import { Trailer } from "../../types/latest";
import ReusableSection from "../../components/common/ReusableSection";
import PlayIcon from "../../assets/icons/PlayIcon";
import CloseIcon from "../../assets/icons/CloseIcon";

const LatestTrailers = () => {
  const dispatch = useAppDispatch();

  const [activeCategory, setActiveCategory] = useState<TrendingCategory>("now_playing");
  const [selectedTrailer, setSelectedTrailer] = useState<Trailer | null>(null);
  const [showModal, setShowModal] = useState(false);

  const { data: trailers = [], isLoading } = useLatestTrailers(activeCategory);
  const hoveredBackdrop = useAppSelector((state) => state.latest.backdrops[activeCategory]);

  // Set default backdrop when trailers load
  useEffect(() => {
    if (trailers.length > 0) {
      dispatch(
        setBackdrop({
          category: activeCategory,
          backdrop: trailers[0].backdrop_path ?? null,
        })
      );
    }
  }, [trailers, activeCategory, dispatch]);

  const scrollerClasses = "flex overflow-x-auto gap-[clamp(1rem,2vw,3rem)] px-2 py-8";

  const handleTrailerClick = (trailer: Trailer) => {
    setSelectedTrailer(trailer);
    setShowModal(true);
  };

  const handleBackdropHover = (trailer: Trailer) => {
    dispatch(
      setBackdrop({
        category: activeCategory,
        backdrop: trailer.backdrop_path ?? null,
      })
    );
  };

  const handleModalClose = () => {
    setShowModal(false);
    setSelectedTrailer(null);
  };

  return (
    <section
      className="text-white transition-all duration-500 bg-cyan-800 bg-blend-multiply"
      style={{
        backgroundImage: hoveredBackdrop
          ? `url(https://image.tmdb.org/t/p/w1280${hoveredBackdrop})`
          : "none",
        backgroundSize: "cover",
        backgroundPosition: "center center",
        transition: "background-image 0.5s ease-in-out",
      }}
    >
      <ReusableSection
        title="Latest Trailers"
        options={trendingOptions}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        data={{ [activeCategory]: trailers }}
        isLoading={isLoading}
        itemsContainerClassName={scrollerClasses}
        skeletonType="landscape"
        skeletonCount={4}
        section="trailers"
        renderItem={(trailer) => (
          <div
            key={trailer.id}
            onMouseEnter={() => handleBackdropHover(trailer)}
            onClick={() => handleTrailerClick(trailer)}
            className="cursor-pointer"
          >
            <div className="relative overflow-hidden group w-[clamp(17rem,19vw,22rem)]">
              <img
                src={trailer.thumbnail}
                alt={trailer.title}
                className="rounded-2xl"
                loading="lazy"
              />
              <div className="absolute inset-2 flex items-center justify-center pb-[1.29rem] pr-2 transition-transform ease-in hover:scale-125">
                <PlayIcon />
              </div>
              <p className="mt-2 text-base font-semibold truncate text-center max-w-80">
                {trailer.title}
              </p>
            </div>
          </div>
        )}
      />

      {/* Trailer Modal */}
      {showModal && selectedTrailer && (
        <div
          className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50"
          onClick={handleModalClose}
        >
          <div
            className="relative w-[80%] aspect-video max-w-6xl"
            onClick={(e) => e.stopPropagation()}
          >
            <iframe
              className="w-full h-full rounded-lg"
              src={`https://www.youtube.com/embed/${selectedTrailer.youtubeKey}`}
              title={selectedTrailer.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
            <button
              onClick={handleModalClose}
              className="absolute top-[-2.2rem] right-[-3rem] rounded-full px-3 py-1 hover:scale-125"
            >
              <CloseIcon />
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default LatestTrailers;
