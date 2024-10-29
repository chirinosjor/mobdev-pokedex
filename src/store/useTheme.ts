import { create } from 'zustand';

interface ThemeStore {
  isDarkMode: boolean;
  contrastTextColor: string;
  backgroundColor: string;
  setDarkMode: (isDarkMode: boolean) => void;
}

const useTheme = create<ThemeStore>((set) => ({
  isDarkMode: false,
  contrastTextColor: 'text-gray-500',
  backgroundColor: 'bg-white',
  setDarkMode: (isDarkMode) =>
    set(() => ({
      isDarkMode,
      contrastTextColor: isDarkMode ? 'text-white' : 'text-gray-500',
      backgroundColor: isDarkMode ? 'bg-slate-700' : 'bg-white',
    })),
}));

export default useTheme;
