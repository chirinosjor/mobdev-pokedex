import { PokemonAbility } from '@services/pokemonDetail';
import useTheme from '@store/useTheme';
import { Ruler, Weight } from 'lucide-react';

function AboutSection({ weight, height, abilities }: { weight: number, height: number, abilities: PokemonAbility[]; }) {
  const { isDarkMode, contrastTextColor } = useTheme();
  return (
    <>
      <h2 className={`${contrastTextColor} text-lg font-semibold mt-4`}>About</h2>
      <div className="grid grid-cols-3 w-full px-6 mt-2 text-center text-gray-600 gap-12 items-center justify-items-center">
        <div className="flex flex-col items-center justify-center w-20 h-20">
          <p className={`${contrastTextColor} text-xl font-semibold`}>{weight}</p>
          <div className="flex justify-center items-center mt-2 gap-2">
            <Weight size={18} fill={isDarkMode ? 'white' : 'gray'} />
            <p className={`${contrastTextColor} text-sm`}>Weight</p>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center w-32 h-20 relative">
          <p className={`${contrastTextColor} text-xl font-semibold`}>{height}</p>
          <div className="flex justify-center items-center mt-2 gap-2">
            <Ruler size={18} fill={isDarkMode ? 'white' : 'gray'} />
            <p className={`${contrastTextColor} text-sm`}>Height</p>
          </div>
          <span className="absolute left-0 top-0 h-full w-px bg-gray-300"></span>
          <span className="absolute right-0 top-0 h-full w-px bg-gray-300"></span>
        </div>
        <div className="flex flex-col items-center justify-center w-20 h-20">
          <div className="text-xl font-semibold leading-none">
            {abilities?.slice(0, 2).map((ability) => (
              <p className={`${contrastTextColor}`} key={ability.ability.name}>{ability.ability.name}</p>
            ))}
          </div>
          <p className={`${contrastTextColor} text-sm mt-1`}>Moves</p>
        </div>
      </div>
    </>
  );
}

export default AboutSection;