import SortButton from "./components/SortButton";
import Logo from "./components/Logo";
import Searchbar from "./components/Searchbar";
import DarkModeSwitch from "./components/DarkModeSwitch";

function Header() {
  return (
    <div className="bg-red-500 p-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between">
        <div className="flex sm:justify-start mb-4 sm:mb-0">
          <Logo />
        </div>
        <div className="flex flex-row items-center justify-center sm:flex-1 sm:justify-between">
          <div className="flex-1 mr-4 sm:mx-4 sm:flex sm:justify-center sm:items-center sm:gap-4">
            <Searchbar />
          </div>
          <div className="md:w-32 flex justify-center gap-4">
            <DarkModeSwitch />
            <SortButton />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
