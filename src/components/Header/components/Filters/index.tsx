import { SlidersHorizontal } from 'lucide-react';
import { useState } from 'react';
import { POKEMON_TYPES } from './constants';

interface FiltersProps {
  selectedTypes: string[];
  setSelectedTypes: React.Dispatch<React.SetStateAction<string[]>>;
}

function Filters({ selectedTypes, setSelectedTypes }: FiltersProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleTypeChange = (type: string) => {
    setSelectedTypes((prev) => {
      if (prev.includes(type)) {
        return prev.filter((t) => t !== type);
      } else {
        return [...prev, type];
      }
    });
  };

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={toggleDropdown}
        className="relative bg-white text-red-500 rounded-full p-2 shadow-lg focus:outline-none"
      >
        <SlidersHorizontal />
        {selectedTypes.length > 0 && (
          <span className="absolute top-0 right-0 h-4 w-4 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
            {selectedTypes.length}
          </span>
        )}
      </button>
      {isOpen && (
        <div className="absolute z-50 right-0 mt-2 w-48 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            {POKEMON_TYPES.map((type) => (
              <label key={type} className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100">
                <input
                  type="checkbox"
                  checked={selectedTypes.includes(type)}
                  onChange={() => handleTypeChange(type)}
                  className="mr-2"
                />
                {type}
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Filters;
