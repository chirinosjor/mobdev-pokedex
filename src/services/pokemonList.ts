export interface Pokemon {
  name: string;
  url: string;
}

interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Pokemon[];
}

export const TOTAL_POKEMONS = 151;

export const fetchPokemonList = async (limit: number, offset: number): Promise<Pokemon[]> => {
  const url = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`;
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    const data: PokemonListResponse = await response.json();

    return data.results;
  } catch (error) {
    console.error("Failed to fetch Pokémon list:", error);
    throw error;
  }
};
