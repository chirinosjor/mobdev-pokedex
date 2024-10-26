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
  allPokemons: Pokemon[];
  filteredPokemons: Pokemon[] | null;
  setAllPokemons: (pokemons: Pokemon[]) => void;
  setFilteredPokemons: (pokemons: Pokemon[] | null) => void;
  pokemons: Pokemon[];
  setPokemons: (pokemons: Pokemon[]) => void;
  selectedPokemon: PokemonDetailType | null;
  setSelectedPokemon: (pokemon: PokemonDetailType | null) => void;
}

const usePokemonStore = create<PokemonStore>((set) => ({
  allPokemons: [],
  filteredPokemons: null,
  setAllPokemons: (pokemons) => set({ allPokemons: pokemons }),
  setFilteredPokemons: (pokemons) => set({ filteredPokemons: pokemons }),
  pokemons: [],
  setPokemons: (pokemons) => set({ pokemons }),
  selectedPokemon: null,
  setSelectedPokemon: (pokemon) => set({ selectedPokemon: pokemon }),
}));

export default usePokemonStore;
