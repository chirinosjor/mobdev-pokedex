import React, { useEffect, useState } from 'react';
import { Pokemon } from '../../../../services/pokemonList';
import { fetchPokemonDetail, type PokemonDetailType } from '../../../../services/pokemonDetail';
import usePokemonStore from '../../../../store/usePokemonStore';

const PokemonDetail: React.FC<{ pokemon: Pokemon; }> = ({ pokemon }) => {
  const { setSelectedPokemon } = usePokemonStore();
  const [pokemonDetail, setPokemonDetail] = useState<PokemonDetailType | null>(null);
  const { name, url } = pokemon;

  useEffect(() => {
    const getPokemonDetail = async () => {
      try {
        const detail = await fetchPokemonDetail(url);
        setPokemonDetail(detail);
        setSelectedPokemon(detail);
      } catch (error) {
        console.error("Error fetching Pokémon detail:", error);
      }
    };

    getPokemonDetail();
  }, [url, setSelectedPokemon]);

  if (!pokemonDetail) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-4 max-w-xs">
      <div className="flex items-start">
        <div className="mr-4">
          <img
            src={pokemonDetail.sprites.front_default}
            alt={name}
            className="w-24 h-24"
          />
        </div>
        <div>
          <h2 className="text-lg font-bold capitalize">{pokemonDetail.name}</h2>
          <p className="text-gray-500">#{pokemonDetail.id}</p>
        </div>
      </div>
    </div>
  );
};

export default PokemonDetail;
