import { useEffect } from 'react';
import usePokemonStore from '../../store/usePokemonStore';
import usePaginationStore from '../../store/usePaginationStore';
import PokemonDetail from './components/PokemonDetail';
import EmptyPokemonList from './components/EmptyPokemonList';
import PokemonListPagination from './components/Pagination';
import usePokemonList from './usePokemonList';

function PokemonList() {
  const { allPokemons, filteredPokemons } = usePokemonStore();
  const { currentPage, pokemonsPerPage, setCurrentPage, setPokemonsPerPage } = usePaginationStore();
  const { displayedPokemons, loadPokemons, isEmptyState, totalPokemons } = usePokemonList();

  useEffect(() => {
    if (allPokemons.length === 0) {
      loadPokemons();
    }
  }, [allPokemons, loadPokemons]);

  useEffect(() => {
    setCurrentPage(1);
  }, [filteredPokemons, setCurrentPage]);

  if (isEmptyState) { return <EmptyPokemonList />; }

  return (
    <div className="flex flex-col h-full md:min-h[750px]">
      <div className="flex-grow">
        <div className="h-[650px] sm:h-[700px] md:h-[750px] overflow-y-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 justify-items-center sm:my-4 md:my-8 lg:my-12">
            {displayedPokemons.map((pokemon, index) => (
              <div key={index} className="flex justify-center">
                <PokemonDetail pokemon={pokemon} />
              </div>
            ))}
          </div>
        </div>
      </div>
      <PokemonListPagination
        currentPage={currentPage}
        totalPokemons={totalPokemons}
        pokemonsPerPage={pokemonsPerPage}
        setCurrentPage={setCurrentPage}
        setPokemonsPerPage={setPokemonsPerPage}
      />
    </div>
  );
}

export default PokemonList;
