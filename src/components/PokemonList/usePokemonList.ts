import { useCallback } from "react";
import usePokemonStore, { Pokemon } from "../../store/usePokemonStore";
import { extractIdFromUrl } from "./utils";
import { fetchPokemons } from '../../services/pokemonList';
import usePaginationStore from "../../store/usePaginationStore";
import useSortStore from "../../store/useSortStore";

const usePokemonList = () => {
  const { allPokemons, filteredPokemons, setAllPokemons, setPokemons } = usePokemonStore();
  const { currentPage, pokemonsPerPage } = usePaginationStore();
  const { sortOption } = useSortStore();

  const sortPokemons = useCallback((pokemonList: Pokemon[]) => {
    return [...pokemonList].sort((a, b) => {
      if (sortOption === 'name') {
        return a.name.localeCompare(b.name);
      } else if (sortOption === 'number') {
        const firstPokemonId = extractIdFromUrl(a.url);
        const secondPokemonId = extractIdFromUrl(b.url);
        return firstPokemonId - secondPokemonId;
      }
      return 0;
    });
  }, [sortOption]);

  const loadPokemons = async () => {
    const pokemonList = await fetchPokemons();
    const sortedPokemons = sortPokemons(pokemonList);
    setAllPokemons(sortedPokemons);

    const initialPokemons = sortedPokemons.slice(0, pokemonsPerPage);
    setPokemons(initialPokemons);
  };

  const isEmptyState = (filteredPokemons ? filteredPokemons.length : allPokemons.length) === 0;
  const sortedPokemons = filteredPokemons ? sortPokemons(filteredPokemons) : sortPokemons(allPokemons);
  const listStart = (currentPage - 1) * pokemonsPerPage;
  const listEnd = listStart + pokemonsPerPage;
  const displayedPokemons = sortedPokemons.slice(listStart, listEnd);
  const totalPokemons = filteredPokemons ? filteredPokemons.length : allPokemons.length;

  return { sortPokemons, loadPokemons, isEmptyState, displayedPokemons, totalPokemons };
};

export default usePokemonList;
