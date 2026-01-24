import SearchIcon from "../../assets/icons/SearchIcon"

const SearchBar = () => {
  return (
    <search className="h-10 flex items-center px-[clamp(2rem,15vw,15rem)]">
      <SearchIcon />
      <input
        type="text"
        id="search"
        name="search"
        placeholder="Search for a movie, tv show, person..."
        className="w-full px-4 text-gray-800 bg-white outline-none italic font-extralight text-[clamp(0.875rem,1.2vw,1rem)]"
      />
    </search>
  )
}

export default SearchBar
