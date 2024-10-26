interface SearchbarProps {
  className?: string;
}

const Searchbar = ({ className }: SearchbarProps) => {
  return (
    <div className={`flex items-center w-full sm:max-w-md bg-white rounded-full shadow-md p-2 ${className}`}>
      <input
        placeholder="Search..."
        className="w-full px-4 py-2 text-gray-700 outline-none"
      />
    </div>
  );
};

export default Searchbar;
