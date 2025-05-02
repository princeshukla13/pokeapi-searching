import React from "react";

function PokemonCard({ pokemon }) {
  return (
    <div className="pokemon-card">
      <div className="pokemon-card-inner">
        <div className="pokemon-card-front">
          <img src={pokemon.image} alt={pokemon.name} />
          <h3>
            #{pokemon.id} {pokemon.name}
          </h3>
          <p>{pokemon.types.join(", ")}</p>
        </div>
        <div className="pokemon-card-back">
          <p>
            <strong>ID:</strong> {pokemon.id}
          </p>
          <p>
            <strong>Name:</strong> {pokemon.name}
          </p>
          <p>
            <strong>Type:</strong> {pokemon.types.join(", ")}
          </p>
        </div>
      </div>
    </div>
  );
}

export default PokemonCard;
