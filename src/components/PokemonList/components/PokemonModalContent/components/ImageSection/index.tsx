import { PokemonDetailType } from "@services/pokemonDetail";

type SpritesType = Pick<PokemonDetailType, 'sprites'>;

function ImageSection({ sprites, name }: { sprites: SpritesType['sprites'] | null, name: string; }) {
  return (
    <>
      {sprites && sprites.front_default ? (
        <img
          src={sprites.front_default}
          alt={name}
          className="w-60 h-60 mx-auto -mt-16 absolute top-[7rem]"
        />
      ) : (
        <div className="w-60 h-60 mx-auto -mt-16 absolute top-[7rem] bg-gray-300 rounded-full flex items-center justify-center">
          <span className="text-gray-500">No Image</span>
        </div>
      )}
    </>
  );
}

export default ImageSection;
