import { POKEMON_TYPE_COLORS, PokemonTypeKey } from '@constants/pokemonTypes';
import { PokemonType } from '@services/pokemonDetail';

function TypesBadges({ types }: { types: PokemonType[]; }) {
  return (
    types && types.length > 0 && (
      <div className="flex gap-2 my-2">
        {types.map(({ type }) => {
          const typeKey = type.name as PokemonTypeKey;
          const typeColor = POKEMON_TYPE_COLORS[typeKey];
          return (
            <span
              className={`bg-${typeColor?.darker || 'gray-700'} text-white px-4 py-1 rounded-full text-sm`}
              key={type.name}
            >
              {type.name.charAt(0).toUpperCase() + type.name.slice(1)}
            </span>
          );
        })}
      </div>
    )
  );
}

export default TypesBadges;