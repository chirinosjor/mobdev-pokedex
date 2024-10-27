import { Pokemon } from '@store/usePokemonStore';
import { fetchPokemonDescription, fetchPokemonDetail } from '@services/pokemonDetail';
import { useEffect, useState } from 'react';
import { PokemonDetailType } from '@services/pokemonDetail';
import { Ruler, Weight } from 'lucide-react';

interface PokemonModalContentProps {
  pokemon: Pokemon;
  setSelectedPokemon: (pokemon: Pokemon | null) => void;
}

const PokemonModalContent = ({ pokemon, setSelectedPokemon }: PokemonModalContentProps) => {
  const [pokemonDetails, setPokemonDetails] = useState<PokemonDetailType | null>(null);
  const [pokemonDescription, setPokemonDescription] = useState<string | null>(null);
  const [descriptionLoading, setDescriptionLoading] = useState(true); // Loading state for the description
  const { abilities, height, weight, types, name, id, sprites } = pokemonDetails || {};

  const pokemonStats = pokemonDetails
    ? pokemonDetails.stats.map((stat) => ({
      label: stat.stat.name,
      value: stat.base_stat,
    }))
    : [];

  useEffect(() => {
    const fetchDetails = async () => {
      const details = await fetchPokemonDetail(pokemon.url);
      setPokemonDetails(details);
    };
    fetchDetails();
  }, [pokemon.url]);

  useEffect(() => {
    if (!pokemonDetails || !pokemonDetails.species?.url) {
      return;
    }
    const fetchDescription = async () => {
      setDescriptionLoading(true);

      const description = await fetchPokemonDescription(pokemonDetails.species.url);
      setPokemonDescription(description);
      setDescriptionLoading(false);
    };
    fetchDescription();
  }, [pokemonDetails]);

  return (
    <div className="bg-green-500 flex flex-col items-center pt-6 px-4 relative">
      <header className="w-full flex justify-between items-center text-white text-lg font-bold">
        <button className="text-2xl" onClick={() => setSelectedPokemon(null)}>&larr;</button>
        <span>{name}</span>
        <span>{`#${id?.toString().padStart(3, '0')}`}</span>
      </header>
      <div className="mt-36 flex flex-col justify-end items-center bg-white rounded-3xl w-full h-[600px] pb-4">
        <img
          src={sprites?.front_default}
          alt={name}
          className="w-60 h-60 mx-auto -mt-16 absolute top-[7rem]"
        />
        {types && types.length > 0 && (
          <div className="flex gap-2 my-2">
            {types.map(({ type }) => (
              <span className="bg-green-700 text-white px-4 py-1 rounded-full text-sm" key={type.name}>
                {type.name.charAt(0).toUpperCase() + type.name.slice(1)}
              </span>
            ))}
          </div>
        )}
        <h2 className="text-green-700 text-lg font-semibold mt-4">About</h2>
        <div className="flex justify-center w-full px-6 mt-2 text-center text-gray-600 gap-12 items-center">
          <div className="flex flex-col justify-center items-center w-20 h-20">
            <p className="text-xl font-semibold">{weight}</p>
            <div className='flex justify-center items-center mt-2 gap-2'>
              <Weight size={18} fill='gray' />
              <p className="text-sm">Weight</p>
            </div>
          </div>
          <div className="flex flex-col justify-center items-center w-28 h-20 border-x-2 border-gray-300">
            <p className="text-xl font-semibold">{height}</p>
            <div className='flex justify-center items-center mt-2 gap-2'>
              <Ruler size={18} fill='gray' />
              <p className="text-sm">Height</p>
            </div>
          </div>
          <div className="flex flex-col justify-center items-center w-20 h-20">
            <div className="text-xl font-semibold leading-none">
              {abilities?.slice(0, 2).map((ability) => (
                <p key={ability.ability.name}>{ability.ability.name}</p>
              ))}
            </div>
            <p className="text-sm">Moves</p>
          </div>
        </div>
        <p className="mt-4 text-center text-gray-600 text-sm px-4 w-full max-w-[300px]">
          {descriptionLoading ? (
            <div className="max-w-full animate-pulse h-8">
              <div
                className="block w-full h-2 my-2 font-sans text-5xl antialiased font-semibold leading-tight tracking-normal bg-gray-300 rounded-full text-inherit">
                &nbsp;
              </div>
              <div
                className="block w-full h-2 mb-2 font-sans text-5xl antialiased font-semibold leading-tight tracking-normal bg-gray-300 rounded-full text-inherit">
                &nbsp;
              </div>
              <div
                className="block w-full h-2 font-sans text-5xl antialiased font-semibold leading-tight tracking-normal bg-gray-300 rounded-full text-inherit">
                &nbsp;
              </div>
            </div>
          ) : (
            <p className="text-center text-gray-600 text-sm px-4 w-full max-w-[400px] h-10">
              {pokemonDescription}
            </p>
          )}
        </p>
        <h2 className="text-green-700 text-lg font-semibold mt-6">Base Stats</h2>
        <div className="w-full px-6 mt-4 space-y-2">
          {pokemonStats.map((stat, index) => (
            <div key={index} className="flex items-center gap-2">
              <span className="w-24 text-sm font-semibold text-green-700">{stat.label}</span>
              <span className="text-gray-600">{stat.value}</span>
              <div className="w-full h-2 bg-green-200 rounded-full overflow-hidden">
                {stat.value && (
                  <div
                    className="h-full bg-green-700"
                    style={{ width: `${stat.value / 1.5}%` }}
                  ></div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PokemonModalContent;
