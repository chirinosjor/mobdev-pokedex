export const POKEMON_TYPES = [
  'Grass', 'Fire', 'Water', 'Bug', 'Normal',
  'Poison', 'Electric', 'Ground', 'Fairy',
  'Fighting', 'Psychic', 'Rock', 'Ghost',
  'Ice', 'Dragon', 'Steel',
];

export const POKEMON_TYPE_COLORS = {
  grass: { normal: 'green-400', darker: 'green-600' },
  fire: { normal: 'orange-500', darker: 'orange-700' },
  water: { normal: 'blue-400', darker: 'blue-600' },
  bug: { normal: 'lime-500', darker: 'lime-700' },
  normal: { normal: 'gray-400', darker: 'gray-600' },
  poison: { normal: 'purple-500', darker: 'purple-700' },
  electric: { normal: 'yellow-400', darker: 'yellow-600' },
  ground: { normal: 'yellow-600', darker: 'yellow-800' },
  fairy: { normal: 'pink-300', darker: 'pink-500' },
  fighting: { normal: 'red-500', darker: 'red-700' },
  psychic: { normal: 'pink-400', darker: 'pink-600' },
  rock: { normal: 'amber-500', darker: 'amber-700' },
  ghost: { normal: 'indigo-500', darker: 'indigo-700' },
  ice: { normal: 'cyan-300', darker: 'cyan-500' },
  dragon: { normal: 'purple-600', darker: 'purple-800' },
  steel: { normal: 'gray-500', darker: 'gray-700' },
} as const;

export type PokemonTypeKey = keyof typeof POKEMON_TYPE_COLORS; // This will be a union of the keys
