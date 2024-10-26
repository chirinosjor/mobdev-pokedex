import { useEffect, useState } from 'react';

import usePokemonStore from '@store/usePokemonStore';
import usePaginationStore from '@store/usePaginationStore';
import Filters from '../Filters';
interface SearchbarProps {
  className?: string;
}

const Searchbar = ({ className }: SearchbarProps) => {
  const [search, setSearch] = useState('');
  const { allPokemons, setFilteredPokemons, setPokemons } = usePokemonStore();
  const { pokemonsPerPage } = usePaginationStore();
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

  useEffect(() => {
    const filtered = allPokemons.filter((pokemon) => {
      const nameMatch = pokemon.name.toLowerCase().includes(search.toLowerCase());
      const numberMatch = pokemon.url.split('/').slice(-2, -1)[0] === search;
      const normalizedSelectedTypes = selectedTypes.map(type => type.toLowerCase());

      const typeMatch = normalizedSelectedTypes.length === 0 ||
        pokemon.types.some(typeInfo => normalizedSelectedTypes.includes(typeInfo.type.name.toLowerCase()));

      if (search === '') {
        return typeMatch;
      }

      return (nameMatch || numberMatch) && typeMatch;
    });

    setFilteredPokemons(filtered);
    setPokemons(filtered.slice(0, pokemonsPerPage));
  }, [search, selectedTypes, allPokemons, setFilteredPokemons, setPokemons, pokemonsPerPage]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearch(query);
  };

  return (
    <div className={`flex items-center w-full sm:max-w-md bg-white rounded-full shadow-md p-2 ${className}`}>
      <input
        placeholder="Search by name or number..."
        value={search}
        onChange={handleSearch}
        className="w-full px-4 py-2 text-gray-700 outline-none"
      />
      <Filters selectedTypes={selectedTypes} setSelectedTypes={setSelectedTypes} />
    </div>
  );
};

export default Searchbar;
