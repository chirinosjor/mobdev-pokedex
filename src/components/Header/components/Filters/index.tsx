import { SlidersHorizontal } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { POKEMON_TYPES } from '@constants/pokemonTypes';
import useTheme from '@store/useTheme';

interface FiltersProps {
  selectedTypes: string[];
  setSelectedTypes: React.Dispatch<React.SetStateAction<string[]>>;
}

function Filters({ selectedTypes, setSelectedTypes }: FiltersProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { isDarkMode, backgroundColor, contrastTextColor } = useTheme();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className={`${backgroundColor} relative text-red-500 rounded-full p-2 shadow-lg focus:outline-none`}
      >
        <SlidersHorizontal />
        {selectedTypes.length > 0 && (
          <span className="absolute top-0 right-0 h-4 w-4 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
            {selectedTypes.length}
          </span>
        )}
      </button>
      {isOpen && (
        <div className={`${backgroundColor} absolute z-50 right-0 mt-2 w-48 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`}>
          <div className="py-1">
            {POKEMON_TYPES.map((type) => (
              <label key={type} className={`${contrastTextColor} ${isDarkMode ? 'hover:bg-gray-400' : 'hover:bg-gray-100'} flex items-center px-4 py-2`}>
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
