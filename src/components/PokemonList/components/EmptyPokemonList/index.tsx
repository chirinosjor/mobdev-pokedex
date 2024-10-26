import emptystate from "@assets/emptyState.png";

function EmptyPokemonList() {
  return (
    <div className="flex flex-col items-center justify-center text-center p-6">
      <h1 className="text-lg font-semibold text-gray-700 mb-4">
        We couldn't find any Pokémon, try searching for something else.
      </h1>
      <img
        src={emptystate}
        alt="No Pokémon found"
        className="w-48 h-48 object-contain opacity-70"
      />
    </div>
  );
}

export default EmptyPokemonList;
