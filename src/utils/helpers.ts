export const filterByKey = (
  data: Record<string, string>[],
  event: React.MouseEvent<HTMLElement>
) => {
  const key = event.currentTarget.innerText;
  const sortedData = data.sort((a, b) => {
    if (a[key] < b[key]) return -1;
    if (a[key] > b[key]) return 1;
    return 0;
  });
  console.log(sortedData);
  return sortedData;
};
