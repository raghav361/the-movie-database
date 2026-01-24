// import { Link } from "react-router-dom";

// const navItems = [
//   {
//     label: "Movies",
//     options: [
//       { name: "Popular", path: "/movies/popular" },
//       { name: "Now Playing", path: "/movies/now-playing" },
//       { name: "Upcoming", path: "/movies/upcoming" },
//       { name: "Top Rated", path: "/movies/top-rated" },
//     ],
//   },
//   {
//     label: "TV Shows",
//     options: [
//       { name: "Popular", path: "/shows/popular" },
//       { name: "Airing Today", path: "/shows/airing-today" },
//       { name: "On TV", path: "/shows/on-tv" },
//       { name: "Top Rated", path: "/shows/top-rated" },
//     ],
//   },
//   {
//     label: "People",
//     options: [
//       { name: "Popular People", path: "/people/popular" },
//     ],
//   },
// ];

// const Navbar = () => {
//   return (
//     <nav className="h-16 bg-cyan-950 flex items-center px-60 z-10">
//       <div className="flex items-center gap-8">
//         <Link to="/">
//            <p className="tracking-wide text-3xl font-bold bg-gradient-to-r from-emerald-500 from-10% to-cyan-500 to-70% bg-clip-text text-transparent">TMDB</p>
//         </Link>

//         {navItems.map((item) => (
//           <div key={item.label} className="relative group text-white text-base font-semibold">
//             <button className="flex items-center gap-1 my-2">
//               {item.label}
//             </button>

//             {/* Dropdown */}
//             <div className="absolute w-32 text-sm bg-white text-black rounded shadow-md opacity-0 group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity duration-200 z-10">
//               {item.options.map((option) => (
//                 <Link
//                   key={option.name}
//                   to={option.path}
//                   className="block w-full px-3 py-[0.15rem] my-2 text-sm font-normal hover:bg-slate-200"
//                 >
//                   {option.name}
//                 </Link>
//               ))}
//             </div>
//           </div>
//         ))}
//       </div>
//       <div className="flex items-center ml-auto px-4 py-2 rounded-full bg-gradient-to-r from-emerald-500 from-10% to-cyan-500 to-70%">
//         <p className="text-white font-semibold">R</p>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

import { useState } from "react";
import { Link } from "react-router-dom";
import HamburgerIcon from "../../assets/icons/HamburgerIcon";

const navItems = [
  {
    label: "Movies",
    options: [
      { name: "Popular", path: "/movies/popular" },
      { name: "Now Playing", path: "/movies/now-playing" },
      { name: "Upcoming", path: "/movies/upcoming" },
      { name: "Top Rated", path: "/movies/top-rated" },
    ],
  },
  {
    label: "TV Shows",
    options: [
      { name: "Popular", path: "/shows/popular" },
      { name: "Airing Today", path: "/shows/airing-today" },
      { name: "On TV", path: "/shows/on-tv" },
      { name: "Top Rated", path: "/shows/top-rated" },
    ],
  },
  {
    label: "People",
    options: [{ name: "Popular People", path: "/people/popular" }],
  },
];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);

  const toggleAccordion = (label: string) => {
    setOpenAccordion(openAccordion === label ? null : label);
  };

  return (
    <nav className="h-16 bg-cyan-950 flex items-center px-[clamp(2rem,15vw,15rem)] relative z-50">
      {/* Container for Hamburger & Left-aligned content */}
      <div className="flex items-center">
        {/* Hamburger Menu (visible on screens < lg) */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="text-white lg:hidden mr-4"
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
        >
          <HamburgerIcon />
        </button>

        {/* Desktop Logo & Nav Links (visible on screens >= lg) */}
        <div className="hidden lg:flex items-center gap-8">
          <Link to="/">
            <p className="tracking-wide text-3xl font-bold bg-gradient-to-r from-emerald-500 from-10% to-cyan-500 to-70% bg-clip-text text-transparent">
              TMDB
            </p>
          </Link>
          {navItems.map((item) => (
            <div
              key={item.label}
              className="relative group text-white text-base font-semibold"
            >
              <button className="flex items-center gap-1 my-2">
                {item.label}
              </button>
              {/* Dropdown */}
              <div className="absolute w-32 text-sm bg-white text-black rounded shadow-md opacity-0 group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity duration-200 z-10">
                {item.options.map((option) => (
                  <Link
                    key={option.name}
                    to={option.path}
                    className="block w-full px-3 py-[0.15rem] my-2 text-sm font-normal hover:bg-slate-200"
                  >
                    {option.name}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile-only Centered Logo */}
      <div className="absolute left-1/2 transform -translate-x-1/2 lg:hidden">
        <Link to="/">
          <p className="tracking-wide text-3xl font-bold bg-gradient-to-r from-emerald-500 from-10% to-cyan-500 to-70% bg-clip-text text-transparent">
            TMDB
          </p>
        </Link>
      </div>

      {/* User Avatar (Right-aligned on all screens) */}
      <div className="flex items-center ml-auto">
        <div className="px-4 py-2 rounded-full bg-gradient-to-r from-emerald-500 from-10% to-cyan-500 to-70%">
          <p className="text-white font-semibold">R</p>
        </div>
      </div>

      {/* Mobile Menu (Accordion) */}
      <div
        id="mobile-menu"
        className={`lg:hidden absolute top-16 left-0 w-full bg-cyan-950 transition-all duration-300 ${
          isMenuOpen
            ? "max-h-96 opacity-100"
            : "max-h-0 opacity-0 overflow-hidden"
        }`}
      >
        <div className="flex flex-col px-[clamp(2rem,15vw,15rem)] mb-2">
          {navItems.map((item) => (
            <div
              key={item.label}
              className="text-white text-base font-semibold border-b border-cyan-800"
            >
              <button
                onClick={() => toggleAccordion(item.label)}
                className="w-full flex justify-between items-center py-2"
              >
                {item.label}
                <svg
                  className={`w-4 h-4 transition-transform duration-300 ${
                    openAccordion === item.label ? "rotate-180" : ""
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openAccordion === item.label ? "max-h-40" : "max-h-0"
                }`}
              >
                <div className="flex flex-col pl-4 pb-2">
                  {item.options.map((option) => (
                    <Link
                      key={option.name}
                      to={option.path}
                      className="w-full text-left py-1 text-sm font-normal text-slate-300 hover:text-white"
                      onClick={() => {
                        setIsMenuOpen(false);
                        setOpenAccordion(null);
                      }}
                    >
                      {option.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
