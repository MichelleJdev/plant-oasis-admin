import "./SearchBar.css";

function SearchBar({ setSearchTerm, searchTerm, searchByText }) {
  return (
    <div className="SearchBar">
      <input
        id="SearchBar"
        type="text"
        value={searchTerm}
        onChange={(evt) => setSearchTerm(evt.target.value)}
        placeholder={`Search by ${searchByText}`}
      />
    </div>
  );
}

export default SearchBar;
