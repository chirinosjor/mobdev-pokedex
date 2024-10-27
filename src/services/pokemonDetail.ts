export interface PokemonType {
  slot: number;
  type: {
    name: string;
  };
}

export interface PokemonAbility {
  ability: {
    name: string;
  };
}

export interface PokemonDetailType {
  id: number;
  name: string;
  sprites: {
    front_default: string;
  };
  types: PokemonType[];
  abilities: PokemonAbility[];
  height: number;
  weight: number;
}

export const fetchPokemonDetail = async (url: string): Promise<PokemonDetailType> => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to fetch Pokémon detail: ${response.statusText}`);
  }

  const data: PokemonDetailType = await response.json();
  return data;
};
