import './App.css';
import Header from '@components/Header';
import PokemonList from '@components/PokemonList';
import useTheme from '@store/useTheme';

function App() {
  const { backgroundColor } = useTheme();
  return (
    <div className={`${backgroundColor} min-h-screen flex flex-col`}>
      <Header />
      <PokemonList />
    </div>
  );
}

export default App;
