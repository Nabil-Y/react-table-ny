/**
 * sortByKey function
 * @param data data to be sorted
 * @param key key to sort your data with
 * @param order sorting order ("asc" | "des") only
 * @returns sorted data array
 */
export const sortByKey = (
  data: Record<string, string>[],
  key: string,
  order: string
) => {
  const sortedData = data.sort((a, b) => {
    if (order === "asc") {
      return a[key]?.localeCompare(b[key], undefined, {
        numeric: true,
        sensitivity: "base",
      });
    } else {
      return b[key]?.localeCompare(a[key], undefined, {
        numeric: true,
        sensitivity: "base",
      });
    }
  });
  return sortedData;
};
