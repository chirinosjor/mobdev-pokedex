
function DescriptionSection({ pokemonDescription, descriptionLoading }: { pokemonDescription: string, descriptionLoading: boolean; }) {
  return (
    <div className="mt-4 text-center text-gray-600 text-sm px-4 w-full max-w-[300px]">
      {descriptionLoading ? (
        <div className="max-w-full animate-pulse h-8">
          <div className="block w-full h-2 my-2 bg-gray-300 rounded-full">&nbsp;</div>
          <div className="block w-full h-2 mb-2 bg-gray-300 rounded-full">&nbsp;</div>
          <div className="block w-full h-2 bg-gray-300 rounded-full">&nbsp;</div>
        </div>
      ) : (
        <p className="text-gray-600 text-sm px-4 w-full max-w-[400px] h-10">
          {pokemonDescription}
        </p>
      )}
    </div>
  );
}

export default DescriptionSection;