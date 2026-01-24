// import { useEffect, useState } from 'react';
// import { Movie } from '../types/trending';
// import HeroSkeleton from './HeroSkeleton';

// type Props = {
//   movies: Movie[];
// };

// const Hero = ({ movies }: Props) => {
//   const [index, setIndex] = useState(0);

//   // Auto-change background every 60 seconds
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setIndex((prev) => (prev + 1) % movies.length);
//     }, 60000);

//     return () => clearInterval(interval);
//   }, [movies.length]);

//   if (!movies || movies.length === 0) return <HeroSkeleton />;

//   const currentMovie = movies[index];

//   return (
//     <div className="relative xs:h-[20vh] sm:h-[25vh] lg:h-[30vh] xl:h-[35vh]">
//       {/* Background Image */}
//       <div className="absolute inset-0 after:absolute after:inset-0 after:bg-cyan-700 after:mix-blend-soft-light after:rounded-lg transition-opacity duration-1000 ease-in-out">
//         <img
//           src={`https://image.tmdb.org/t/p/w1280${currentMovie?.backdrop_path}`}
//           alt={currentMovie?.title}
//           className="relative h-full w-full object-cover grayscale"
//           loading="lazy"
//         />
//         <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
//       </div>

//       {/* Overlay Content */}
//       <div className="relative z-10 h-full text-center flex justify-center items-center">
//         <div className="flex flex-col mx-auto">
//           <h1 className="xs:text-lg sm:text-xl lg:text-2xl xl:text-4xl font-bold text-white">
//             Welcome.
//           </h1>
//           <p className="xs:text-base sm:text-lg lg:text-xl xl:text-2xl text-white mb-6">
//             Millions of movies, TV shows and people to discover. Explore now.
//           </p>
//         </div>
//       </div>

//       {/* Optional: Fade effect via background color */}
//       <div className="absolute inset-0 bg-black opacity-30" />
//     </div>
//   );
// };

// export default Hero;

import { useEffect, useState } from 'react';
import { Movie } from '../../types/trending';
import HeroSkeleton from './HeroSkeleton';

type Props = {
  movies: Movie[];
};

const Hero = ({ movies }: Props) => {
  const [index, setIndex] = useState(0);

  // ✅ Guard against undefined movies
  const movieList = movies ?? [];

  useEffect(() => {
    if (movieList.length === 0) return;

    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % movieList.length);
    }, 60000);

    return () => clearInterval(interval);
  }, [movieList.length]);

  if (movieList.length === 0) return <HeroSkeleton />;

  const currentMovie = movieList[index];

  return (
    <div className="relative h-[clamp(20rem,25vh+5vw,40rem)] w-full overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 after:absolute after:inset-0 after:bg-cyan-700 after:mix-blend-soft-light after:rounded-lg transition-opacity duration-1000 ease-in-out">
        <img
          src={`https://image.tmdb.org/t/p/w1280${currentMovie?.backdrop_path}`}
          alt={currentMovie?.title}
          className="relative h-full w-full object-cover grayscale"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
      </div>

      {/* Overlay Content */}
      <div className="relative z-10 h-full text-center flex justify-center items-center px-[clamp(2rem,15vw,15rem)]">
        <div className="flex flex-col mx-auto">
          <h1 className="my-2 font-bold text-white text-[clamp(1.125rem,2vw,2.5rem)]">
            Welcome.
          </h1>
          <p className="mt-2 mb-6 text-white text-[clamp(1rem,1.8vw,2rem)]">
            Millions of movies, TV shows and people to discover. Explore now.
          </p>
        </div>
      </div>

      {/* Optional: Fade effect via background color */}
      <div className="absolute inset-0 bg-black opacity-30" />
    </div>
  );
};

export default Hero;
