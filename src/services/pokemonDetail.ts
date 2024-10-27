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

export interface PokemonStat {
  base_stat: number;
  stat: {
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
  stats: PokemonStat[];
  species: {
    name: string;
    url: string;
  };
}

export const fetchPokemonDetail = async (url: string): Promise<PokemonDetailType> => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to fetch Pokémon detail: ${response.statusText}`);
  }

  const data: PokemonDetailType = await response.json();
  return data;
};

export const fetchPokemonDescription = async (speciesUrl: string): Promise<string> => {
  const response = await fetch(speciesUrl);

  if (!response.ok) {
    throw new Error(`Failed to fetch Pokémon description: ${response.statusText}`);
  }

  const data = await response.json();

  const englishEntry = data.flavor_text_entries.find(
    (entry: { language: { name: string; }; }) => entry.language.name === "en"
  );

  return englishEntry ? englishEntry.flavor_text : "Description not found.";
};
