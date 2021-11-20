export const parseDate = (date: string): string => {
  const toReturn = date.split('-');
  return toReturn.join('.');
};
