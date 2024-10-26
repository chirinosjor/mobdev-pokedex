export const extractIdFromUrl = (url: string): number => {
  const idMatch = url.match(/\/(\d+)\//);
  return idMatch ? parseInt(idMatch[1], 10) : -1;
};