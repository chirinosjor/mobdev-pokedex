import { useEffect } from 'react';
import { TOTAL_POKEMONS } from '../../services/pokemonList';
import usePokemonStore from '../../store/usePokemonStore';
import usePaginationStore from '../../store/usePaginationStore';
import PokemonDetail from './components/PokemonDetail';
import EmptyPokemonList from './components/EmptyPokemonList';
import PokemonListPagination from './components/Pagination';
import usePokemonList from './usePokemonList';
import useSortStore from '../../store/useSortStore';

function PokemonList() {
  const { allPokemons, filteredPokemons, pokemons, setAllPokemons, setPokemons } = usePokemonStore();
  const { sortOption } = useSortStore();
  const { currentPage, pokemonsPerPage, setCurrentPage } = usePaginationStore();
  const { listStart, listEnd, isEmptyState, sortPokemons, loadPokemons } = usePokemonList();

  const totalPokemons = filteredPokemons ? filteredPokemons.length : TOTAL_POKEMONS;

  useEffect(() => {
    if (allPokemons.length === 0) {
      loadPokemons();
    }
  }, [allPokemons, setAllPokemons, setPokemons, pokemonsPerPage, sortPokemons, loadPokemons]);

  useEffect(() => {
    const sortedPokemons = filteredPokemons ? sortPokemons(filteredPokemons) : sortPokemons(allPokemons);
    setPokemons(sortedPokemons.slice(listStart, listEnd));
  }, [currentPage, filteredPokemons, allPokemons, pokemonsPerPage, setPokemons, sortPokemons, sortOption, listStart, listEnd]);

  useEffect(() => {
    if (filteredPokemons) {
      setCurrentPage(1);
    }
  }, [filteredPokemons, setCurrentPage]);

  if (isEmptyState) { return <EmptyPokemonList />; }

  return (
    <div className="flex flex-col h-full md:min-h[750px]">
      <div className="flex-grow">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 justify-items-center sm:my-4 md:my-8 lg:my-12">
          {pokemons.map((pokemon, index) => (
            <div key={index} className="flex justify-center">
              <PokemonDetail pokemon={pokemon} />
            </div>
          ))}
        </div>
      </div>
      <PokemonListPagination
        currentPage={currentPage}
        totalPokemons={totalPokemons}
        pokemonsPerPage={pokemonsPerPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
}

export default PokemonList;
