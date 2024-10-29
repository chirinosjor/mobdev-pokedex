import useTheme from "@store/useTheme";

interface PokemonListPaginationProps {
  currentPage: number;
  totalPokemons: number;
  pokemonsPerPage: number;
  setCurrentPage: (page: number) => void;
  setPokemonsPerPage: (perPage: number) => void;
}

function PokemonListPagination({
  currentPage,
  setCurrentPage,
  totalPokemons,
  pokemonsPerPage,
  setPokemonsPerPage,
}: PokemonListPaginationProps) {
  const { backgroundColor, contrastTextColor } = useTheme();
  const totalPages = Math.ceil(totalPokemons / pokemonsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handlePokemonsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newPokemonsPerPage = Number(e.target.value);
    setPokemonsPerPage(newPokemonsPerPage);
    setCurrentPage(1);
  };

  return (
    <div className={`${backgroundColor} flex flex-col sm:flex-row justify-center items-center p-4 space-y-4 sm:space-y-0 sm:space-x-4`}>
      <div className="flex items-center justify-center space-x-2">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className={`bg-red-500 text-white py-2 px-4 rounded-lg transition duration-200 ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-red-600'}`}
        >
          Previous
        </button>
        <p className={`${contrastTextColor} text-center`}>
          Page <span className="font-bold">{currentPage}</span> of <span className="font-bold">{totalPages}</span>
        </p>
        <button
          onClick={handleNextPage}
          disabled={currentPage >= totalPages}
          className={`bg-red-500 text-white py-2 px-4 rounded-lg transition duration-200 ${currentPage >= totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:bg-red-600'}`}
        >
          Next
        </button>
      </div>
      <div className="flex items-center justify-center space-x-2">
        <label htmlFor="perPage" className={`${contrastTextColor} text-gray-700`}>Pokémons per page:</label>
        <select
          id="perPage"
          value={pokemonsPerPage}
          onChange={handlePokemonsPerPageChange}
          className="border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-red-500 focus:border-red-500 transition"
        >
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={30}>30</option>
        </select>
      </div>
    </div>
  );
}

export default PokemonListPagination;
