import { create } from 'zustand';
import { PokemonType } from '@services/pokemonDetail';

export type Pokemon = {
  name: string;
  url: string;
  types: PokemonType[];
  sprites: {
    front_default: string;
  };
};

export type PokemonDetailType = {
  id: number;
  name: string;
  sprites: {
    front_default: string;
  };
};

interface PokemonStore {
  allPokemons: Pokemon[];
  filteredPokemons: Pokemon[] | null;
  pokemons: Pokemon[];
  pokemonsPerPage: number;
  selectedPokemon: PokemonDetailType | null;
  isLoading: boolean;
  setAllPokemons: (pokemons: Pokemon[]) => void;
  setFilteredPokemons: (pokemons: Pokemon[] | null) => void;
  setPokemons: (pokemons: Pokemon[]) => void;
  setSelectedPokemon: (pokemon: PokemonDetailType | null) => void;
  setIsLoading: (isLoading: boolean) => void;
}

const usePokemonStore = create<PokemonStore>((set) => ({
  allPokemons: [],
  filteredPokemons: null,
  pokemons: [],
  pokemonsPerPage: 20,
  selectedPokemon: null,
  isLoading: false,
  setAllPokemons: (pokemons) => set({ allPokemons: pokemons }),
  setFilteredPokemons: (pokemons) => set({ filteredPokemons: pokemons }),
  setPokemons: (pokemons) => set({ pokemons }),
  setSelectedPokemon: (pokemon) => set({ selectedPokemon: pokemon }),
  setIsLoading: (isLoading) => set({ isLoading }),
}));

export default usePokemonStore;
