export const POKEMON_TYPES = [
  'Grass', 'Fire', 'Water', 'Bug', 'Normal',
  'Poison', 'Electric', 'Ground', 'Fairy',
  'Fighting', 'Psychic', 'Rock', 'Ghost',
  'Ice', 'Dragon', 'Steel', 'Flying',
];

export const POKEMON_TYPE_COLORS = {
  grass: { normal: '#4caf50', darker: '#388e3c' },
  fire: { normal: '#ff9800', darker: '#f57c00' },
  water: { normal: '#2196f3', darker: '#1976d2' },
  bug: { normal: '#a4d65e', darker: '#7b9a2a' },
  normal: { normal: '#9e9e9e', darker: '#757575' },
  poison: { normal: '#9c27b0', darker: '#7b1fa2' },
  electric: { normal: '#ffeb3b', darker: '#fbc02d' },
  ground: { normal: '#e2b500', darker: '#c58f00' },
  fairy: { normal: '#f48fb1', darker: '#f06292' },
  fighting: { normal: '#f44336', darker: '#c62828' },
  psychic: { normal: '#e91e63', darker: '#d81b60' },
  rock: { normal: '#ffb74d', darker: '#ffa726' },
  ghost: { normal: '#3f51b5', darker: '#303f9f' },
  ice: { normal: '#81d4fa', darker: '#4fc3f7' },
  dragon: { normal: '#673ab7', darker: '#512da8' },
  steel: { normal: '#9e9e9e', darker: '#757575' },
  flying: { normal: '#009688', darker: '#00695c' },
} as const;


export type PokemonTypeKey = keyof typeof POKEMON_TYPE_COLORS;
