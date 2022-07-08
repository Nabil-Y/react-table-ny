import React, { useMemo, useState } from "react";
import { CustomTable } from "../types/types";
import { sortByKey } from "../utils/helpers";

/**
 * Table function
 * @param props Table properties
 * @returns Table component
 */
const Table = (props: CustomTable) => {
  const { data, skipFirstKey, title, className, possibleRows } = props;

  // Validation that data is an array
  const isDataArray = useMemo(() => Array.isArray(data), [data]);

  const validatedData = useMemo(
    () => (isDataArray ? [...data] : [{ error: "error" }]),
    [data, isDataArray]
  );

  // Validate that data is an array of object
  const isDataObjects = useMemo(
    () => validatedData.every((item) => typeof item === "object"),
    [validatedData]
  );

  // Validate that objects in the array have the same keys
  const firstDataKeys = useMemo(
    () => Object.keys(validatedData[0]),
    [validatedData]
  );
  const areDataObjectsOfSameType = useMemo(
    () =>
      validatedData.every(
        (item) => Object.keys(item).toString() === firstDataKeys.toString()
      ),
    [validatedData, firstDataKeys]
  );

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
    [query, validatedData]
  );

  // Sorting
  const [sortLabel, setSortLabel] = useState("");
  const [order, setOrder] = useState("");
  const [isSorted, setIsSorted] = useState(false);

  /**
   * sortHandler function
   * @param event Mouse Event containing sort label
   */
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

  const numberOfPages = useMemo(
    () => Math.ceil(filteredData.length / rowsPerPage),
    [filteredData, rowsPerPage]
  );
  const pages = [];
  for (let i = 0; i < numberOfPages; i++) pages.push(i + 1);
  const startOfPage = (page - 1) * rowsPerPage;
  const endOfPage = startOfPage + rowsPerPage;

  /**
   * selectRowsPerPage function
   * @param event Mouse event containing desired rows per page
   */
  const selectRowsPerPage = (event: React.MouseEvent<HTMLLIElement>) => {
    const rows = +event.currentTarget.innerText;
    setRowPerPages(rows);
    setPage(1);
  };

  // Display Table
  const finalTableData = useMemo(
    () => (isSorted ? sortByKey(filteredData, sortLabel, order) : filteredData),
    [isSorted, sortLabel, order, filteredData]
  );

  if (!isDataArray) return <p>Input an array</p>;
  if (!isDataObjects) return <p>Input an array of objects</p>;
  if (!areDataObjectsOfSameType)
    return (
      <p>
        Make sure your objects have the same keys and that keys/values are of
        type string
      </p>
    );

  return (
    <section
      className={className ? `table ${className}` : "table"}
      data-testid="table"
    >
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
            {(skipFirstKey ? firstDataKeys.slice(1) : firstDataKeys).map(
              (item, index) => (
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
              )
            )}
          </tr>
        </thead>
        <tbody>
          {finalTableData.slice(startOfPage, endOfPage).map((item, index) => (
            <tr key={Math.random() + index}>
              {(skipFirstKey ? firstDataKeys.slice(1) : firstDataKeys).map(
                (value) => (
                  <td key={value + index}>{item[value]}</td>
                )
              )}
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
            {finalTableData.length === 1 ? "entry" : "entries"}
          </p>
          Pages{" "}
          {pages.map((item) => (
            <button
              key={"page" + item}
              data-testid={"Page " + item}
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
            data-testid="select"
            onFocus={() => setShowPageSelector(true)}
            onBlur={() => setShowPageSelector(false)}
          >
            {rowsPerPage}
          </button>{" "}
          {rowsPerPage === 1 ? "row" : "rows"} per page
          {showPageSelector && (
            <ul className="rows-list">
              {possibleRowsPerPage.map((item, index) => (
                <li
                  key={"rows" + item}
                  onMouseDown={selectRowsPerPage}
                  data-testid={"Choice " + (index + 1)}
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
