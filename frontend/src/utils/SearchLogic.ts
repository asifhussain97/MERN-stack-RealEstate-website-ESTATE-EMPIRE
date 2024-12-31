type GenericObject = { [key: string]: unknown };

export const search = <T extends GenericObject>(data: T[], searchQuery: string): T[] => {
  const filtered = data.filter((item) =>
    Object.values(item).some(
      (value) =>
        value &&
        value.toString().toLowerCase().includes(searchQuery.toLowerCase())
    )
  );
  return filtered;
};