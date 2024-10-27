import { useEffect } from 'react';
import usePokemonStore from '@store/usePokemonStore';
import usePaginationStore from '@store/usePaginationStore';
import PokemonDetail from './components/PokemonDetail';
import EmptyPokemonList from './components/EmptyPokemonList';
import PokemonListPagination from './components/Pagination';
import usePokemonList from './usePokemonList';

function PokemonList() {
  const { allPokemons, filteredPokemons, isLoading } = usePokemonStore();
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

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        <p>Loading...</p>
      </div>
    );
  }

  if (!isLoading && isEmptyState) {
    return <EmptyPokemonList />;
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex-grow overflow-y-auto pb-20">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 p-4">
          {displayedPokemons.map((pokemon, index) => (
            <div key={index} className="flex justify-center">
              <PokemonDetail pokemon={pokemon} />
            </div>
          ))}
        </div>
      </div>
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
        <PokemonListPagination
          currentPage={currentPage}
          totalPokemons={totalPokemons}
          pokemonsPerPage={pokemonsPerPage}
          setCurrentPage={setCurrentPage}
          setPokemonsPerPage={setPokemonsPerPage}
        />
      </div>
    </div>
  );
}

export default PokemonList;
