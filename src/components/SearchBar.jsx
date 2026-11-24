// SearchBar component
// All inputs are controlled: the value comes from props (state in App.jsx),
// and every change calls a function that updates that state.

function SearchBar({
  searchText,
  onSearchChange,
  category,
  onCategoryChange,
  sortOrder,
  onSortChange,
  onClearFilters,
}) {
  return (
    <div className="search-bar">
      <div className="search-field">
        <label htmlFor="search-input">Search</label>
        <input
          id="search-input"
          type="text"
          placeholder="Search products..."
          value={searchText}
          onChange={(event) => onSearchChange(event.target.value)}
        />
      </div>

      <div className="search-field">
        <label htmlFor="category-select">Category</label>
        <select
          id="category-select"
          value={category}
          onChange={(event) => onCategoryChange(event.target.value)}
        >
          <option value="All">All</option>
          <option value="Electronics">Electronics</option>
          <option value="Books">Books</option>
          <option value="School Supplies">School Supplies</option>
          <option value="Accessories">Accessories</option>
        </select>
      </div>

      <div className="search-field">
        <label htmlFor="sort-select">Sort by Price</label>
        <select
          id="sort-select"
          value={sortOrder}
          onChange={(event) => onSortChange(event.target.value)}
        >
          <option value="default">Default</option>
          <option value="low-to-high">Price: Low to High</option>
          <option value="high-to-low">Price: High to Low</option>
        </select>
      </div>

      <div className="search-field">
        <button className="clear-button" onClick={onClearFilters}>
          Clear Filters
        </button>
      </div>
    </div>
  );
}

export default SearchBar;
