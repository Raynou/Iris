import { FaSearch } from "react-icons/fa";

function SearchBar() {
  function search() {
    console.log("Buscando cosas");
  }

  return (
    <div className="search-bar">
      <input type="text" className="search-input" placeholder="Buscar" />
      <button>
        <FaSearch size="24" className="" onClick={search}/>
      </button>
    </div>
  );
}

export default SearchBar;
