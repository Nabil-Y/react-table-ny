export const sortByKey = (
  data: Record<string, string>[],
  key: string,
  order: string
) => {
  const sortFunction = (
    a: Record<string, string>,
    b: Record<string, string>,
    order: string
  ) => {
    if (key === "Street") {
      const streetNumberA = +a[key].split(" ")[0];
      const streetNumberB = +b[key].split(" ")[0];

      if (order === "asc") {
        return streetNumberA - streetNumberB;
      } else {
        return streetNumberB - streetNumberA;
      }
    } else {
      if (order === "asc") {
        if (a[key] < b[key]) return -1;
        if (a[key] > b[key]) return 1;
        return 0;
      } else {
        if (a[key] < b[key]) return 1;
        if (a[key] > b[key]) return -1;
        return 0;
      }
    }
  };

  const sortedData = data.sort((a, b) => sortFunction(a, b, order));
  return sortedData;
};
