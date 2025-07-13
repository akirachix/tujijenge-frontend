import React from "react";
import "./index.css"
const SearchBar = ({ searchTerm, setSearchTerm }) => (
  <input
    type="text"
    className="search-bar"
    placeholder="Search by group name, date, or order id"
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
  />
);
export default SearchBar;