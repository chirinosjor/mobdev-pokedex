import { useEffect } from 'react';
import { fetchPokemons, TOTAL_POKEMONS } from '../../services/pokemonList';
import usePokemonStore from '../../store/usePokemonStore';
import PokemonDetail from './components/PokemonDetail';
import EmptyPokemonList from './components/EmptyPokemonList';
import PokemonListPagination from './components/Pagination';
import usePaginationStore from '../../store/usePaginationStore';

function PokemonList() {
  const { allPokemons, filteredPokemons, pokemons, setAllPokemons, setPokemons } = usePokemonStore();
  const { currentPage, pokemonsPerPage, setCurrentPage } = usePaginationStore();

  const totalPokemons = filteredPokemons ? filteredPokemons.length : TOTAL_POKEMONS;

  useEffect(() => {
    const loadPokemons = async () => {
      const pokemonList = await fetchPokemons();
      setAllPokemons(pokemonList);
      setPokemons(pokemonList.slice(0, pokemonsPerPage));
    };
    if (allPokemons.length === 0) {
      loadPokemons();
    }
  }, [allPokemons, setAllPokemons, setPokemons, pokemonsPerPage]);

  useEffect(() => {
    const start = (currentPage - 1) * pokemonsPerPage;
    const end = start + pokemonsPerPage;

    if (filteredPokemons) {
      setPokemons(filteredPokemons.slice(start, end));
    } else {
      setPokemons(allPokemons.slice(start, end));
    }
  }, [currentPage, filteredPokemons, allPokemons, pokemonsPerPage, setPokemons]);

  useEffect(() => {
    if (filteredPokemons) {
      setCurrentPage(1);
    }
  }, [filteredPokemons, setCurrentPage]);

  if (totalPokemons === 0) {
    return <EmptyPokemonList />;
  }

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
