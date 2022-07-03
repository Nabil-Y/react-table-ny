import { useState } from "react";
import { CustomTable } from "../types/types";
import { sortByKey } from "../utils/helpers";

const Table = (props: CustomTable) => {
  const [query, setQuery] = useState("");
  const [sortLabel, setSortLabel] = useState("");
  const [order, setOrder] = useState("des");
  const [isSorted, setIsSorted] = useState(false);
  const { data, skipFirstKey } = props;

  // Validation that data is an array
  if (!Array.isArray(data)) return <p>Input an Array</p>;

  // Validate that data is an array of object
  const isDataObjects = data.every((item) => typeof item === "object");
  if (!isDataObjects) return <p>Input an array of objects</p>;

  // Validate that objects in the array have the same keys
  const validatedData = [...data];
  const firstDataKeys = Object.keys(validatedData[0]);
  const areObjectsOfSameType = validatedData.every(
    (item) => Object.keys(item).toString() === firstDataKeys.toString()
  );
  if (!areObjectsOfSameType)
    return <p>Make sure your objects have the same keys</p>;

  // Skip first key of data array check
  if (skipFirstKey) {
    firstDataKeys.shift();
  }

  // Filter data with search input
  const filteredData = validatedData.filter((item) =>
    Object.values(item).toString().toLowerCase().includes(query.toLowerCase())
  );

  const sortHandler = (event: React.MouseEvent<HTMLElement>) => {
    const label = event.currentTarget.innerText;
    setIsSorted(true);
    if (sortLabel !== label) {
      setOrder("asc");
      setSortLabel(label);
    } else {
      const newOrder = order === "asc" ? "des" : "asc";
      setOrder(newOrder);
    }
  };

  // display table
  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <table>
        <thead>
          <tr>
            {firstDataKeys.map((item, index) => (
              <th key={item + index} onClick={(event) => sortHandler(event)}>
                {item}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {(isSorted
            ? sortByKey(filteredData, sortLabel, order)
            : filteredData
          ).map((item, index) => (
            <tr key={Math.random() + index}>
              {firstDataKeys.map((value) => (
                <td key={value + index}>{item[value]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
