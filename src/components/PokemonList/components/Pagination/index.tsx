interface PokemonListPaginationProps {
  currentPage: number;
  totalPokemons: number;
  pokemonsPerPage: number;
  setCurrentPage: (page: number) => void;
}

function PokemonListPagination({ currentPage, setCurrentPage, totalPokemons, pokemonsPerPage }: PokemonListPaginationProps) {

  const handleNextPage = () => {
    if (currentPage < Math.ceil(totalPokemons / pokemonsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="flex mt-4 gap-12 justify-center items-center">
      <button
        onClick={handlePrevPage}
        disabled={currentPage === 1}
        className="bg-red-500 text-white p-2 rounded disabled:opacity-50"
      >
        Previous
      </button>
      <p className="text-center text-gray-500">
        Page {currentPage} of {Math.ceil(totalPokemons / pokemonsPerPage)}
      </p>
      <button
        onClick={handleNextPage}
        disabled={currentPage >= Math.ceil(totalPokemons / pokemonsPerPage)}
        className="bg-red-500 text-white p-2 rounded disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
}

export default PokemonListPagination;