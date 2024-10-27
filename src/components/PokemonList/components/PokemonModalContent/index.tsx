import { Pokemon } from '@store/usePokemonStore';
import { fetchPokemonDetail } from '@services/pokemonDetail';
import { useEffect, useState } from 'react';
import { PokemonDetailType } from '@services/pokemonDetail';

interface PokemonModalContentProps {
  pokemon: Pokemon;
  setSelectedPokemon: (pokemon: Pokemon | null) => void;
}

const PokemonModalContent = ({ pokemon, setSelectedPokemon }: PokemonModalContentProps) => {
  const [pokemonDetails, setPokemonDetails] = useState<PokemonDetailType | null>(null);
  const { abilities, height, weight, types, name, id, sprites } = pokemonDetails || {};

  useEffect(() => {
    const fetchDetails = async () => {
      const details = await fetchPokemonDetail(pokemon.url);
      setPokemonDetails(details);
    };
    fetchDetails();
  }, [pokemon.url]);

  return (
    <div className="bg-green-500 flex flex-col items-center pt-6 px-4 relative">
      <header className="w-full flex justify-between items-center text-white text-lg font-bold">
        <button className="text-2xl" onClick={() => setSelectedPokemon(null)}>&larr;</button>
        <span>{name}</span>
        <span>{`#${id?.toString().padStart(3, '0')}`}</span>
      </header>
      <div className="mt-24 flex flex-col items-center bg-white rounded-3xl w-full max-w-md p-4 h-[600px] pt-[100px]">
        <img
          src={sprites?.front_default}
          alt={name}
          className="w-56 h-56 mx-auto -mt-16 absolute top-[7rem]"
        />
        {
          types && types.length > 0 && (
            <div className="flex gap-2 my-2">
              {types.map((type) => (
                <span className="bg-green-700 text-white px-4 py-1 rounded-full text-sm">
                  {type.type.name.charAt(0).toUpperCase() + type.type.name.slice(1)}
                </span>
              ))}
            </div>
          )
        }
        <h2 className="text-green-700 text-lg font-semibold mt-4">About</h2>
        <div className="flex justify-between w-full px-6 mt-2 text-center text-gray-600">
          <div>
            <p className="text-xl font-semibold">{weight}</p>
            <p className="text-sm">Weight</p>
          </div>
          <div className="border-l-2 border-gray-300 h-full"></div>
          <div>
            <p className="text-xl font-semibold">{height}</p>
            <p className="text-sm">Height</p>
          </div>
          <div className="border-l-2 border-gray-300 h-full"></div>
          <div>
            <p className="text-xl font-semibold">{abilities?.slice(0, 2).map((ability) => <div key={ability.ability.name}>{ability.ability.name}</div>)}</p>
            <p className="text-sm">Moves</p>
          </div>
        </div>

        <p className="mt-4 text-center text-gray-600 text-sm px-4">
          There is a plant seed on its back right from the day this Pokémon is born. The seed slowly grows larger.
        </p>
        <h2 className="text-green-700 text-lg font-semibold mt-6">Base Stats</h2>
        <div className="w-full px-6 mt-4 space-y-2">
          {[
            { label: 'HP', value: 45 },
            { label: 'ATK', value: 49 },
            { label: 'DEF', value: 49 },
            { label: 'SATK', value: 65 },
            { label: 'SDEF', value: 65 },
            { label: 'SPD', value: 45 },
          ].map((stat, index) => (
            <div key={index} className="flex items-center gap-2">
              <span className="w-8 text-sm font-semibold text-green-700">{stat.label}</span>
              <span className="text-gray-600">{stat.value.toString().padStart(3, '0')}</span>
              <div className="w-full h-2 bg-green-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-green-700"
                  style={{ width: `${stat.value}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PokemonModalContent;
