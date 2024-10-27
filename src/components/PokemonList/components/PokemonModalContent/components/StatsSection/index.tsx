interface PokemonStats {
  label: string;
  value: number;
}

interface TypeColors {
  normal: string;
  darker: string;
}

interface StatsSectionProps {
  pokemonStats: PokemonStats[];
  typeColors: TypeColors | null;
}

function StatsSection({ pokemonStats, typeColors }: StatsSectionProps) {
  return (
    <>
      <h2 className="text-lg font-semibold mt-6">Base Stats</h2>
      <div className="w-full px-6 mt-4 space-y-2">
        {pokemonStats.map((stat, index) => (
          <div key={index} className="flex items-center gap-2">
            <span style={{ color: typeColors?.normal }}
              className="w-24 text-sm font-semibold">{stat.label}</span>
            <span className="text-gray-600">{stat.value}</span>
            <div className="w-full h-2 bg-green-200 rounded-full overflow-hidden">
              {stat.value && (
                <div
                  className="h-full"
                  style={{ width: `${stat.value / 1.5}%`, backgroundColor: typeColors?.normal }}
                ></div>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default StatsSection;