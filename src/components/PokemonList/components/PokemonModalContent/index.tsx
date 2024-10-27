import { Pokemon } from '@store/usePokemonStore';
import { fetchPokemonDescription, fetchPokemonDetail } from '@services/pokemonDetail';
import { useEffect } from 'react';
import HeaderSection from './components/HeaderSection';
import TypesBadges from './components/TypesBadges';
import AboutSection from './components/AboutSection';
import DescriptionSection from './components/DescriptionSection';
import StatsSection from './components/StatsSection';
import ImageSection from './components/ImageSection';
import useModalContent from './useModalContent';
interface PokemonModalContentProps {
  pokemon: Pokemon;
  setSelectedPokemon: (pokemon: Pokemon | null) => void;
}

const PokemonModalContent = ({ pokemon, setSelectedPokemon }: PokemonModalContentProps) => {
  const {
    pokemonDetails,
    pokemonDescription,
    descriptionLoading,
    pokemonInfo,
    setPokemonDetails,
    setPokemonDescription,
    setDescriptionLoading,
    pokemonStats,
    typeColors,
  } = useModalContent();

  const { abilities, height, weight, types, name, id, sprites } = pokemonInfo;

  useEffect(() => {
    const fetchDetails = async () => {
      const details = await fetchPokemonDetail(pokemon.url);
      setPokemonDetails(details);
    };
    fetchDetails();
  }, [pokemon.url, setPokemonDetails]);

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
  }, [pokemonDetails, setDescriptionLoading, setPokemonDescription]);

  return (
    <div className={`bg-${typeColors?.normal || 'gray-500'} flex flex-col items-center pt-6 px-4 relative`}>
      <HeaderSection name={name} id={id} setSelectedPokemon={setSelectedPokemon} />
      <div className="mt-36 flex flex-col justify-end items-center bg-white rounded-3xl w-full h-[600px] pb-4">
        <ImageSection sprites={sprites} name={name} />
        <TypesBadges types={types} />
        <AboutSection weight={weight} height={height} abilities={abilities} />
        <DescriptionSection pokemonDescription={pokemonDescription} descriptionLoading={descriptionLoading} />
        <StatsSection pokemonStats={pokemonStats} typeColors={typeColors} />
      </div>
    </div>
  );
};

export default PokemonModalContent;
