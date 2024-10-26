import { create } from 'zustand';

interface SortStore {
  sortOption: 'name' | 'number';
  setSortOption: (option: 'name' | 'number') => void;
}

const useSortStore = create<SortStore>((set) => ({
  sortOption: 'name',
  setSortOption: (option) => set({ sortOption: option }),
}));

export default useSortStore;
