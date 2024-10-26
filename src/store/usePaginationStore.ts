import { create } from 'zustand';

interface PaginationStore {
  currentPage: number;
  setCurrentPage: (page: number) => void;
  pokemonsPerPage: number;
  setPokemonsPerPage: (perPage: number) => void;
}

const usePaginationStore = create<PaginationStore>((set) => ({
  currentPage: 1,
  setCurrentPage: (page) => set({ currentPage: page }),
  pokemonsPerPage: 20,
  setPokemonsPerPage: (perPage: number) => set({ pokemonsPerPage: perPage }),
}));

export default usePaginationStore;
