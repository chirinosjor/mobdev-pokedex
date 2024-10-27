import { PokemonDetailType } from "@services/pokemonDetail";

type SpritesType = Pick<PokemonDetailType, 'sprites'>;

function ImageSection({ sprites, name }: { sprites: SpritesType['sprites'] | null, name: string; }) {
  return (
    <img
      src={sprites?.front_default}
      alt={name}
      className="w-60 h-60 mx-auto -mt-16 absolute top-[7rem]"
    />
  );
}

export default ImageSection;