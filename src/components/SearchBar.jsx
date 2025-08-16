const SearchBar = ({ searchTerm, onSearchChange }) => (
  <div className="search-container">
    <input
      type="text"
      className="search-input"
      placeholder="Search users by name..."
      value={searchTerm}
      onChange={(e) => onSearchChange(e.target.value)}
    />
  </div>
);

export default SearchBar;
