import { useState } from 'react';
import { SORT_OPTIONS } from './constants';

const SortButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedSort, setSelectedSort] = useState<"name" | "number">("name");

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSortSelection = (option: "name" | "number") => {
    setSelectedSort(option);
    setIsOpen(false);
  };

  return (
    <div>
      <button
        onClick={toggleDropdown}
        className="bg-white text-red-500 rounded-full p-2 shadow-lg focus:outline-none h-10 w-10"
      >
        {SORT_OPTIONS[selectedSort]}
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <button
              onClick={() => handleSortSelection("name")}
              className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
            >
              Sort by Name
            </button>
            <button
              onClick={() => handleSortSelection("number")}
              className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
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
