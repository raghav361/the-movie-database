import { useEffect, useState } from "react";
import SearchIcon from "../../assets/icons/SearchIcon";
import useSearchMulti from "../../hooks/useSearchMulti";
import { SearchResult } from "../../types/search";

const languageNames = new Intl.DisplayNames(["en"], { type: "language" });

const MovieTypeIcon = () => (
  <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
    <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3h11A2.5 2.5 0 0 1 20 5.5v13a2.5 2.5 0 0 1-2.5 2.5h-11A2.5 2.5 0 0 1 4 18.5v-13Zm4.3-.5-1.1 3h3.2l1.1-3H8.3Zm5.3 0-1.1 3h3.2l1.1-3h-3.2ZM6 10v8.5c0 .3.2.5.5.5h11c.3 0 .5-.2.5-.5V10H6Z" />
  </svg>
);

const TvTypeIcon = () => (
  <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
    <path d="M7 4h2.6l2.4 2.5L14.4 4H17l-3.3 3.4H19A3 3 0 0 1 22 10.4v6.1a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3v-6.1a3 3 0 0 1 3-3h5.3L7 4Zm-2 5.4a1 1 0 0 0-1 1v6.1a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-6.1a1 1 0 0 0-1-1H5Z" />
  </svg>
);

const PersonTypeIcon = () => (
  <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
    <path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm0 2c-4.1 0-7.5 2.6-7.5 5.7 0 .7.6 1.3 1.3 1.3h12.4c.7 0 1.3-.6 1.3-1.3 0-3.1-3.4-5.7-7.5-5.7Z" />
  </svg>
);

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query.trim());
    }, 400);

    return () => clearTimeout(timer);
  }, [query]);

  const { data = [], isLoading, isError, error } = useSearchMulti(debouncedQuery);

  const shouldShowResults = isFocused && query.trim().length > 0;
  const filteredResults = data.slice(0, 8);

  const getTitle = (item: SearchResult) => item.title || item.name || "Untitled";

  const getTypeIcon = (item: SearchResult) => {
    if (item.media_type === "movie") return <MovieTypeIcon />;
    if (item.media_type === "tv") return <TvTypeIcon />;
    return <PersonTypeIcon />;
  };

  const getDepartmentLabel = (item: SearchResult) => {
    const departmentMap: Record<string, string> = {
      Acting: "Actor",
      Directing: "Director",
      Writing: "Writer",
      Production: "Producer",
      Editing: "Editor",
      Sound: "Sound",
      Camera: "Camera",
      Art: "Art",
      Crew: "Crew",
    };

    return departmentMap[item.known_for_department || ""] || item.known_for_department || "Person";
  };

  const getTypeLabel = (item: SearchResult) => {
    if (item.media_type === "movie") return "Movie";
    if (item.media_type === "tv") return "TV";
    return "Person";
  };

  const getYearLabel = (item: SearchResult) => {
    const date = item.media_type === "movie" ? item.release_date : item.first_air_date;
    return date ? date.slice(0, 4) : "";
  };

  const getLanguageLabel = (item: SearchResult) => {
    if (!item.original_language) return "";
    return languageNames.of(item.original_language) || item.original_language.toUpperCase();
  };

  return (
    <div className="relative w-full">
      <div className="px-[clamp(2rem,15vw,15rem)]">
        <div className="flex h-10 w-full items-center border-b border-slate-200 bg-white">
        <div className="mr-3 text-cyan-900">
          <SearchIcon />
        </div>
        <input
          type="text"
          id="search"
          name="search"
          placeholder="Search for a movie, tv show, person..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 150)}
          className="h-10 w-full bg-transparent text-[clamp(0.875rem,1.2vw,1rem)] font-extralight italic text-slate-800 outline-none placeholder:text-slate-400"
        />
        </div>
      </div>

      {shouldShowResults && (
        <div className="absolute left-0 right-0 top-full z-40 border-b border-slate-200 bg-white shadow-[0_18px_40px_rgba(15,23,42,0.08)]">
          {query.trim().length < 2 && (
            <p className="px-[clamp(2rem,15vw,15rem)] py-3 text-sm text-slate-500">
              Type at least 2 characters to start searching.
            </p>
          )}

          {query.trim().length >= 2 && isLoading && (
            <p className="px-[clamp(2rem,15vw,15rem)] py-3 text-sm text-slate-500">
              Searching...
            </p>
          )}

          {query.trim().length >= 2 && isError && (
            <p className="px-[clamp(2rem,15vw,15rem)] py-3 text-sm text-red-600">
              {error?.message || "Search failed. Please try again."}
            </p>
          )}

          {query.trim().length >= 2 && !isLoading && !isError && filteredResults.length === 0 && (
            <p className="px-[clamp(2rem,15vw,15rem)] py-3 text-sm text-slate-500">
              No results found.
            </p>
          )}

          {query.trim().length >= 2 && !isLoading && !isError && filteredResults.length > 0 && (
            <div className="px-[clamp(2rem,15vw,15rem)]">
              <ul className="max-h-[24rem] overflow-y-auto py-1.5">
                {filteredResults.map((item) => {
                  const title = getTitle(item);
                  const typeLabel = getTypeLabel(item);
                  const yearLabel = getYearLabel(item);
                  const languageLabel = getLanguageLabel(item);
                  const departmentLabel = item.media_type === "person" ? getDepartmentLabel(item) : "";

                  return (
                    <li
                      key={`${item.media_type}-${item.id}`}
                      className="border-t border-slate-100 first:border-t-0"
                    >
                      <button
                        type="button"
                        className="flex w-full items-center justify-between gap-4 py-2 text-left text-sm transition-colors duration-200 hover:bg-slate-50"
                      >
                        <div className="min-w-0 flex items-center gap-2.5 text-slate-900">
                          <span className="shrink-0 text-cyan-900/90">{getTypeIcon(item)}</span>
                          <div className="min-w-0 flex items-center gap-2.5">
                            <span className="truncate font-medium">{title}</span>
                            {item.media_type === "person" && departmentLabel && (
                              <span className="truncate text-slate-400">• {departmentLabel}</span>
                            )}
                            {item.media_type !== "person" && yearLabel && (
                              <span className="shrink-0 text-slate-400">• {yearLabel}</span>
                            )}
                            {item.media_type !== "person" && languageLabel && (
                              <span className="truncate text-slate-400">• {languageLabel}</span>
                            )}
                          </div>
                        </div>
                        <span className="shrink-0 text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-cyan-900/75">
                          {typeLabel}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
