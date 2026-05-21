import { useEffect, useState } from "react";
import SearchIcon from "../../assets/icons/SearchIcon";
import MovieTypeIcon from "../../assets/icons/MovieTypeIcon";
import PersonTypeIcon from "../../assets/icons/PersonTypeIcon";
import TvTypeIcon from "../../assets/icons/TvTypeIcon";
import useSearchMulti from "../../hooks/useSearchMulti";
import { SearchResult } from "../../types/search";

const languageNames = new Intl.DisplayNames(["en"], { type: "language" });
const contentPaddingClassName = "px-[clamp(2rem,15vw,15rem)]";

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

  const getSecondaryLabel = (item: SearchResult) => {
    if (item.media_type === "person") {
      return getDepartmentLabel(item);
    }

    const parts = [getYearLabel(item), getLanguageLabel(item)].filter(Boolean);
    return parts.join(" • ");
  };

  return (
    <div className="relative w-full">
      <div className={contentPaddingClassName}>
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
            <p className={`${contentPaddingClassName} py-3 text-sm text-slate-500`}>
              Type at least 2 characters to start searching.
            </p>
          )}

          {query.trim().length >= 2 && isLoading && (
            <p className={`${contentPaddingClassName} py-3 text-sm text-slate-500`}>
              Searching...
            </p>
          )}

          {query.trim().length >= 2 && isError && (
            <p className={`${contentPaddingClassName} py-3 text-sm text-red-600`}>
              {error?.message || "Search failed. Please try again."}
            </p>
          )}

          {query.trim().length >= 2 && !isLoading && !isError && filteredResults.length === 0 && (
            <p className={`${contentPaddingClassName} py-3 text-sm text-slate-500`}>
              No results found.
            </p>
          )}

          {query.trim().length >= 2 && !isLoading && !isError && filteredResults.length > 0 && (
            <div className={contentPaddingClassName}>
              <ul className="max-h-[24rem] overflow-y-auto py-1.5">
                {filteredResults.map((item) => {
                  const title = getTitle(item);
                  const typeLabel = getTypeLabel(item);
                  const secondaryLabel = getSecondaryLabel(item);

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
                            {secondaryLabel && (
                              <span className="truncate text-slate-400">• {secondaryLabel}</span>
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
