import { create } from 'zustand';

export type Pokemon = {
  name: string;
  url: string;
};

export type PokemonDetailType = {
  id: number;
  name: string;
  sprites: {
    front_default: string;
  };
};

interface PokemonStore {
  pokemons: Pokemon[];
  setPokemons: (pokemons: Pokemon[]) => void;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  pokemonsPerPage: number;
  selectedPokemon: PokemonDetailType | null;
  setSelectedPokemon: (pokemon: PokemonDetailType | null) => void;
}

const usePokemonStore = create<PokemonStore>((set) => ({
  pokemons: [],
  setPokemons: (pokemons) => set({ pokemons }),
  currentPage: 1,
  setCurrentPage: (page) => set({ currentPage: page }),
  pokemonsPerPage: 20,
  selectedPokemon: null,
  setSelectedPokemon: (pokemon) => set({ selectedPokemon: pokemon }),
}));

export default usePokemonStore;
