import React from 'react';
import { Pokemon } from '@store/usePokemonStore';
import { extractIdFromUrl } from '../../utils';

interface PokemonDetailProps {
  pokemon: Pokemon;
}

const PokemonDetail: React.FC<PokemonDetailProps> = ({ pokemon }) => {
  const pokemonId = extractIdFromUrl(pokemon.url);

  return (
    <div className="w-40 h-48 rounded-lg shadow-lg overflow-hidden relative">
      <div className="absolute top-2 left-2 bg-gray-800 text-white text-xs font-bold px-2 py-1 rounded-full">
        #{pokemonId.toString().padStart(3, '0')}
      </div>
      <div className="w-full h-full bg-gradient-to-b from-white to-gray-200 flex items-center justify-center">
        {pokemon.sprites && pokemon.sprites.front_default ? (
          <img
            src={pokemon.sprites.front_default}
            alt={pokemon.name}
            className="w-24 h-24 object-contain"
          />
        ) : (
          <div className="w-24 h-24 bg-gray-300 rounded-full flex items-center justify-center">
            <span className="text-gray-500">No Image</span>
          </div>
        )}
      </div>
      <div className="absolute bottom-0 left-0 right-0 bg-white bg-opacity-80 p-2">
        <h3 className="text-center text-sm font-semibold capitalize">{pokemon.name}</h3>
      </div>
    </div>
  );
};

export default PokemonDetail;
