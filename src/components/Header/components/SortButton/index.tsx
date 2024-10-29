import { useState } from 'react';
import { SORT_OPTIONS } from './constants';
import useSortStore from '@store/useSortStore';
import useTheme from '@store/useTheme';

const SortButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const sortOption = useSortStore((state) => state.sortOption);
  const setSortOption = useSortStore((state) => state.setSortOption);
  const { isDarkMode, backgroundColor, contrastTextColor } = useTheme();

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSortSelection = (option: 'name' | 'number') => {
    setSortOption(option);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className={`${backgroundColor} ${isDarkMode ? 'text-white' : 'text-red-500'}  rounded-full p-2 shadow-lg focus:outline-none h-10 w-10`}
      >
        {SORT_OPTIONS[sortOption]}
      </button>
      {isOpen && (
        <div className={`${backgroundColor} absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50`}>
          <div className="py-1">
            <button
              onClick={() => handleSortSelection('name')}
              className={`${contrastTextColor} ${isDarkMode ? 'hover:bg-gray-400' : 'hover:bg-gray-100'} w-full text-left px-4 py-2`}
            >
              Sort by Name
            </button>
            <button
              onClick={() => handleSortSelection('number')}
              className={`${contrastTextColor} ${isDarkMode ? 'hover:bg-gray-400' : 'hover:bg-gray-100'} w-full text-left px-4 py-2`}
            >
              Sort by Number
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SortButton;
