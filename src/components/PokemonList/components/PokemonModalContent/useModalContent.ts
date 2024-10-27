import { useState } from "react";
import { PokemonDetailType } from '@services/pokemonDetail';
import { POKEMON_TYPE_COLORS, type PokemonTypeKey } from '@constants/pokemonTypes';

const useModalContent = () => {
  const [pokemonDetails, setPokemonDetails] = useState<PokemonDetailType | null>(null);
  const [pokemonDescription, setPokemonDescription] = useState<string>('');
  const [descriptionLoading, setDescriptionLoading] = useState(true);

  const pokemonInfo = {
    abilities: pokemonDetails?.abilities || [],
    height: pokemonDetails?.height || 0,
    weight: pokemonDetails?.weight || 0,
    types: pokemonDetails?.types || [],
    name: pokemonDetails?.name || '',
    id: pokemonDetails?.id || 0,
    sprites: pokemonDetails?.sprites || { front_default: '' },
  };

  const pokemonStats = pokemonDetails
    ? pokemonDetails.stats.map((stat) => ({
      label: stat.stat.name,
      value: stat.base_stat,
    }))
    : [];

  const primaryType = pokemonInfo.types && pokemonInfo.types[0]?.type.name as PokemonTypeKey;
  const typeColors = primaryType ? POKEMON_TYPE_COLORS[primaryType] : null;

  return {
    pokemonDetails,
    pokemonDescription,
    descriptionLoading,
    pokemonStats,
    typeColors,
    setPokemonDetails,
    setPokemonDescription,
    setDescriptionLoading,
    pokemonInfo,
  };
};

export default useModalContent;
