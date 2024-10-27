import { Pokemon } from "@store/usePokemonStore";

interface HeaderSectionProps {
  name: string;
  id: number;
  setSelectedPokemon: (pokemon: Pokemon | null) => void;
}

function HeaderSection({ name, id, setSelectedPokemon }: HeaderSectionProps) {
  return (
    <header className="w-full flex justify-between items-center text-white text-lg font-bold">
      <button className="text-2xl" onClick={() => setSelectedPokemon(null)}>&larr;</button>
      <span className="text-3xl font-extrabold text-white drop-shadow-lg">
        {name && name.charAt(0).toUpperCase() + name.slice(1)}
      </span>
      <span>{`#${id?.toString().padStart(3, '0')}`}</span>
    </header>
  );
}

export default HeaderSection;