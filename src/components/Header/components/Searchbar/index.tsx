import { useState } from 'react';
import usePokemonStore from '../../../../store/usePokemonStore';
import usePaginationStore from '../../../../store/usePaginationStore';
interface SearchbarProps {
  className?: string;
}

const Searchbar = ({ className }: SearchbarProps) => {
  const [search, setSearch] = useState('');
  const { allPokemons, setFilteredPokemons, setPokemons } = usePokemonStore();
  const { pokemonsPerPage } = usePaginationStore();

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value.toLowerCase();
    setSearch(query);

    if (query === '') {
      setFilteredPokemons(null);
      setPokemons(allPokemons.slice(0, pokemonsPerPage));
      return;
    }

    const filtered = allPokemons.filter((pokemon) => {
      const nameMatch = pokemon.name.toLowerCase().includes(query);
      const numberMatch = pokemon.url.split('/').slice(-2, -1)[0] === query;
      return nameMatch || numberMatch;
    });

    setFilteredPokemons(filtered);
    setPokemons(filtered.slice(0, pokemonsPerPage));
  };

  return (
    <div className={`flex items-center w-full sm:max-w-md bg-white rounded-full shadow-md p-2 ${className}`}>
      <input
        placeholder="Search by name or number..."
        value={search}
        onChange={handleSearch}
        className="w-full px-4 py-2 text-gray-700 outline-none"
      />
    </div>
  );
};

export default Searchbar;
