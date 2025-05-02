import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import Header from "./components/Header";
import PokemonCard from "./components/PokemonCard";
import FilterBar from "./components/FilterBar";

function App() {
  const [pokemons, setPokemons] = useState([]);
  const [filteredPokemons, setFilteredPokemons] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const res = await axios.get(
          "https://pokeapi.co/api/v2/pokemon?limit=150"
        );
        const results = res.data.results;

        const data = await Promise.all(
          results.map(async (pokemon) => {
            const poke = await axios.get(pokemon.url);
            return {
              id: poke.data.id,
              name: poke.data.name,
              image: poke.data.sprites.front_default,
              types: poke.data.types.map((t) => t.type.name),
            };
          })
        );

        setPokemons(data);
        setFilteredPokemons(data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch Pokémon data.");
        setLoading(false);
      }
    };

    fetchPokemons();
  }, []);

  useEffect(() => {
    let filtered = pokemons;

    if (searchTerm) {
      filtered = filtered.filter((p) =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedType) {
      filtered = filtered.filter((p) => p.types.includes(selectedType));
    }

    setFilteredPokemons(filtered);
  }, [searchTerm, selectedType, pokemons]);

  return (
    <div className="app">
      <Header />
      <FilterBar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        selectedType={selectedType}
        onTypeChange={setSelectedType}
      />

      {loading && <p className="status">Loading...</p>}
      {error && <p className="status error">{error}</p>}
      {!loading && filteredPokemons.length === 0 && (
        <p className="status">No Pokémon found.</p>
      )}

      <div className="pokemon-list">
        {filteredPokemons.map((pokemon) => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}
      </div>
    </div>
  );
}

export default App;
