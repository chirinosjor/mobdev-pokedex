import { fetchPokemonDetail, PokemonType } from "./pokemonDetail";

export interface Pokemon {
  name: string;
  url: string;
  types: PokemonType[];
}

interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Pokemon[];
}

export const TOTAL_POKEMONS = 151;

export const fetchPokemons = async (limit: number = TOTAL_POKEMONS, offset: number = 0): Promise<Pokemon[]> => {
  const url = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`;
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    const data: PokemonListResponse = await response.json();

    const pokemonsWithTypes = await Promise.all(data.results.map(async (pokemon) => {
      const detail = await fetchPokemonDetail(pokemon.url);

      return {
        name: pokemon.name,
        url: pokemon.url,
        types: detail.types.map((typeInfo: PokemonType) => ({
          slot: typeInfo.slot,
          type: {
            name: typeInfo.type.name,
          },
        })),
      };
    }));

    return pokemonsWithTypes;
  } catch (error) {
    console.error("Failed to fetch Pokémon list:", error);
    throw error;
  }
};
