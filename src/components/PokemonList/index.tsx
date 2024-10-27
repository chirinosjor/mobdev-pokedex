import { useEffect, useState } from 'react';
import usePokemonStore from '@store/usePokemonStore';
import usePaginationStore from '@store/usePaginationStore';
import PokemonDetail from './components/PokemonDetail';
import StatePokemonList from './components/StatePokemonList';
import PokemonListPagination from './components/Pagination';
import usePokemonList from './usePokemonList';
import { Pokemon } from '@store/usePokemonStore';
import PokemonModalContent from './components/PokemonModalContent';
import emptystate from "@assets/emptyState.png";
import loadingGif from "@assets/loading.gif";

function PokemonList() {
  const { allPokemons, filteredPokemons, isLoading } = usePokemonStore();
  const { currentPage, pokemonsPerPage, setCurrentPage, setPokemonsPerPage } = usePaginationStore();
  const { displayedPokemons, loadPokemons, isEmptyState, totalPokemons } = usePokemonList();
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);

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
      <StatePokemonList title="Loading..." imgSrc={loadingGif} />
    );
  }

  if (!isLoading && isEmptyState) {
    return <StatePokemonList title="We couldn't find any Pokémon, try searching for something else." imgSrc={emptystate} />;
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex-grow overflow-y-auto pb-20">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 p-4">
          {displayedPokemons.map((pokemon, index) => (
            <div key={index} className="flex justify-center">
              <PokemonDetail
                pokemon={pokemon}
                onClick={() => setSelectedPokemon(pokemon)}
              />
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
      {selectedPokemon && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          {selectedPokemon && <PokemonModalContent pokemon={selectedPokemon} setSelectedPokemon={setSelectedPokemon} />}
        </div>
      )}
    </div>
  );
}

export default PokemonList;
