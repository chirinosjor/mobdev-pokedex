import useTheme from '@store/useTheme';

function DarkModeSwitch() {
  const { isDarkMode, setDarkMode, backgroundColor } = useTheme();
  return (
    <button
      className={`${backgroundColor} rounded-full p-2 text-gray-500 hover:text-gray-700`}
      onClick={() => setDarkMode(!isDarkMode)}
    >
      {isDarkMode ? '🌙' : '🌞'}
    </button>
  );
}

export default DarkModeSwitch;