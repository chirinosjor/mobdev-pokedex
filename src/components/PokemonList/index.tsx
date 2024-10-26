import { useEffect, useCallback } from 'react';
import { fetchPokemonList, TOTAL_POKEMONS } from '../../services/pokemonList';
import PokemonDetail from './PokemonDetail';
import usePokemonStore from '../../store/usePokemonStore';

function PokemonList() {
  const { pokemons, setPokemons, currentPage, setCurrentPage, pokemonsPerPage } = usePokemonStore();

  const getPokemons = useCallback(async (page: number) => {
    try {
      const offset = (page - 1) * pokemonsPerPage;
      const limit = Math.min(pokemonsPerPage, TOTAL_POKEMONS - offset);
      const pokemonList = await fetchPokemonList(limit, offset);
      setPokemons(pokemonList);
    } catch (error) {
      console.error("Error fetching Pokémon list:", error);
    }
  }, [setPokemons, pokemonsPerPage]);

  useEffect(() => {
    getPokemons(currentPage);
  }, [currentPage, getPokemons]);

  const handleNextPage = () => {
    if (currentPage < Math.ceil(TOTAL_POKEMONS / pokemonsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

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
      <div className="flex mt-4 gap-12 justify-center items-center">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className="bg-red-500 text-white p-2 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <p className="text-center text-gray-500">
          Page {currentPage} of {Math.ceil(TOTAL_POKEMONS / pokemonsPerPage)}
        </p>
        <button
          onClick={handleNextPage}
          disabled={currentPage >= Math.ceil(TOTAL_POKEMONS / pokemonsPerPage)}
          className="bg-red-500 text-white p-2 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default PokemonList;
