import { create } from 'zustand';

interface PaginationStore {
  currentPage: number;
  setCurrentPage: (page: number) => void;
  pokemonsPerPage: number;
}

const usePaginationStore = create<PaginationStore>((set) => ({
  currentPage: 1,
  setCurrentPage: (page) => set({ currentPage: page }),
  pokemonsPerPage: 20,
}));

export default usePaginationStore;
