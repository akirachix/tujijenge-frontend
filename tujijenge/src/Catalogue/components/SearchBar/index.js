import React from "react";
import { MdSearch } from "react-icons/md";
import "./style.css";

function SearchBar({ value, onChange, onSearch }) {
  return (

      <div className="catalogue-search-bar">
        <MdSearch className="search-icon" />
        <input
          type="text"
          placeholder="Search for a product"
          value={value}
          onChange={onChange}
          aria-label="Search for a product"
          onKeyDown={e => { if (e.key === "Enter") onSearch(); }}
        />
      </div>
  
  );
}

export default SearchBar;