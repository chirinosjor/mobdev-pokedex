export const capitalizeFirstLetter = (label: string) => {
  return label.charAt(0).toUpperCase() + label.slice(1);
};

const labelMappings: Record<string, string> = {
  'special-attack': 'S-Atk',
  'special-defense': 'S-Def',
};

export const formatLabel = (label: string) => {
  const lowerCaseLabel = label.toLowerCase();
  return labelMappings[lowerCaseLabel] || capitalizeFirstLetter(lowerCaseLabel);
};