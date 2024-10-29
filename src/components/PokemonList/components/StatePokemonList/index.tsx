import useTheme from "@store/useTheme";

function StatePokemonList({ title, imgSrc }: { title: string; imgSrc: string; }) {
  const { contrastTextColor } = useTheme();
  return (
    <div className="flex flex-col items-center justify-center text-center p-6">
      <h1 className={`${contrastTextColor} text-lg font-semibold mb-4`}>
        {title}
      </h1>
      <img
        src={imgSrc}
        alt={title}
        className="w-48 h-48 object-contain opacity-70"
      />
    </div>
  );
}

export default StatePokemonList;
