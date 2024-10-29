import { POKEMON_TYPE_COLORS, PokemonTypeKey } from '@constants/pokemonTypes';
import { PokemonType } from '@services/pokemonDetail';
import { capitalizeFirstLetter } from '@utils/string';

function TypesBadges({ types }: { types: PokemonType[]; }) {

  if (!types || types.length === 0) {
    return null;
  }

  return (
    <div className="flex gap-2 my-2">
      {types.map(({ type }) => {
        const typeKey = type.name as PokemonTypeKey;
        const typeColor = POKEMON_TYPE_COLORS[typeKey];
        return (
          <span
            style={{ backgroundColor: typeColor?.normal }}
            className="text-white px-4 py-1 rounded-full text-sm"
            key={type.name}
          >
            {capitalizeFirstLetter(type.name)}
          </span>
        );
      })}
    </div>
  );
}

export default TypesBadges;
