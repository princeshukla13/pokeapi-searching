import React from "react";

const types = [
  "",
  "normal",
  "fire",
  "water",
  "grass",
  "electric",
  "ice",
  "fighting",
  "poison",
  "ground",
  "flying",
  "psychic",
  "bug",
  "rock",
  "ghost",
  "dragon",
  "dark",
  "steel",
  "fairy",
];

function FilterBar({ searchTerm, onSearchChange, selectedType, onTypeChange }) {
  return (
    <div className="filter-bar">
      <input
        type="text"
        placeholder="Search Pokémon"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
      />
      <select
        value={selectedType}
        onChange={(e) => onTypeChange(e.target.value)}
      >
        <option value="">All Types</option>
        {types.map((type) => (
          <option key={type} value={type}>
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </option>
        ))}
      </select>
    </div>
  );
}

export default FilterBar;
