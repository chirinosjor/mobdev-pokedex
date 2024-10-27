import { useCallback } from "react";

import usePokemonStore, { Pokemon } from "@store/usePokemonStore";
import { fetchPokemons } from '@services/pokemonList';
import { fetchPokemonDetail } from '@services/pokemonDetail';
import usePaginationStore from "@store/usePaginationStore";
import useSortStore from "@store/useSortStore";

import { extractIdFromUrl } from "./utils";

const usePokemonList = () => {
  const { allPokemons, filteredPokemons, setAllPokemons, setPokemons, setIsLoading } = usePokemonStore();
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

  const loadPokemons = useCallback(async () => {
    setIsLoading(true);
    try {
      const pokemonList = await fetchPokemons();
      const detailedPokemonList = await Promise.all(
        pokemonList.map(async (pokemon) => {
          const details = await fetchPokemonDetail(pokemon.url);
          return {
            ...pokemon,
            types: details.types,
            sprites: details.sprites
          };
        })
      );
      const sortedPokemons = sortPokemons(detailedPokemonList);
      setAllPokemons(sortedPokemons);

      const initialPokemons = sortedPokemons.slice(0, pokemonsPerPage);
      setPokemons(initialPokemons);
    } finally {
      setIsLoading(false);
    }
  }, [setIsLoading, sortPokemons, setAllPokemons, setPokemons, pokemonsPerPage]);

  const isEmptyState = (filteredPokemons ? filteredPokemons.length : allPokemons.length) === 0;
  const sortedPokemons = filteredPokemons ? sortPokemons(filteredPokemons) : sortPokemons(allPokemons);
  const listStart = (currentPage - 1) * pokemonsPerPage;
  const listEnd = listStart + pokemonsPerPage;
  const displayedPokemons = sortedPokemons.slice(listStart, listEnd);
  const totalPokemons = filteredPokemons ? filteredPokemons.length : allPokemons.length;

  return { sortPokemons, loadPokemons, isEmptyState, displayedPokemons, totalPokemons };
};

export default usePokemonList;
