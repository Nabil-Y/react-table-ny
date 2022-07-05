import React, { useMemo, useState } from "react";
import { CustomTable } from "../types/types";
import { sortByKey } from "../utils/helpers";

const Table = (props: CustomTable) => {
  const { data, skipFirstKey, title, customClasses, possibleRows } = props;

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

  // Search
  const [query, setQuery] = useState("");

  const filteredData = useMemo(
    () =>
      validatedData.filter((item) =>
        Object.values(item)
          .toString()
          .toLowerCase()
          .includes(query.toLowerCase())
      ),
    [query]
  );

  // Sorting
  const [sortLabel, setSortLabel] = useState("");
  const [order, setOrder] = useState("");
  const [isSorted, setIsSorted] = useState(false);

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

  // Pages
  const possibleRowsPerPage =
    possibleRows &&
    possibleRows.length > 0 &&
    possibleRows.every((item) => typeof item === "number")
      ? possibleRows.slice(0, 4)
      : [10, 25, 50, 100];

  const [page, setPage] = useState(1);
  const [showPageSelector, setShowPageSelector] = useState(false);
  const [rowsPerPage, setRowPerPages] = useState(possibleRowsPerPage[0]);

  const numberOfPages = Math.ceil(filteredData.length / rowsPerPage);
  const pages = [];
  for (let i = 0; i < numberOfPages; i++) pages.push(i + 1);
  const startOfPage = (page - 1) * rowsPerPage;
  const endOfPage = startOfPage + rowsPerPage;

  const selectRowsPerPage = (event: React.MouseEvent<HTMLLIElement>) => {
    const rows = +event.currentTarget.innerText;
    setRowPerPages(rows);
    setPage(1);
  };

  // Display Table
  const finalTableData = useMemo(
    () => (isSorted ? sortByKey(filteredData, sortLabel, order) : filteredData),
    [isSorted, sortLabel, order, filteredData, sortByKey]
  );

  return (
    <section className={`table ${customClasses}`}>
      <header>
        {title ? <h2>{title}</h2> : ""}
        <div className="search">
          <label htmlFor="searchbar">Search:</label>{" "}
          <input
            id="searchbar"
            type="text"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </div>
      </header>
      <table>
        <thead>
          <tr>
            {firstDataKeys.map((item, index) => (
              <th
                key={item + index}
                onClick={(event) => sortHandler(event)}
                className={
                  sortLabel === item && order === "asc"
                    ? "sorted-asc"
                    : sortLabel === item && order === "des"
                    ? "sorted-des"
                    : ""
                }
              >
                {item}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {finalTableData.slice(startOfPage, endOfPage).map((item, index) => (
            <tr key={Math.random() + index}>
              {firstDataKeys.map((value) => (
                <td key={value + index}>{item[value]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <footer>
        <div className="page-selector">
          <p>
            Showing {startOfPage + 1}/
            {endOfPage > filteredData.length ? filteredData.length : endOfPage}{" "}
            from {filteredData.length}{" "}
          </p>
          Pages{" "}
          {pages.map((item) => (
            <button
              key={"page" + item}
              title={"Page " + item}
              onClick={() => setPage(item)}
              className={page === item ? "selected-page" : ""}
            >
              {item}
            </button>
          ))}
        </div>
        <div className="rows-selector">
          Show{" "}
          <button
            title="select"
            onFocus={() => setShowPageSelector(true)}
            onBlur={() => setShowPageSelector(false)}
          >
            {rowsPerPage}
          </button>{" "}
          rows per page
          {showPageSelector && (
            <ul className="rows-list">
              {possibleRowsPerPage.map((item, index) => (
                <li
                  key={"rows" + item}
                  onMouseDown={selectRowsPerPage}
                  title={"Choice " + (index + 1)}
                >
                  {item}
                </li>
              ))}
            </ul>
          )}
        </div>
      </footer>
    </section>
  );
};

export default Table;
