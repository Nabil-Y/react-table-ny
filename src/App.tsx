import { EMPLOYEES } from "./data/testData";
import Table from "./components/Table";

/**
 * App function
 * @returns App component
 */
const App = () => {
  return (
    <Table
      data={EMPLOYEES}
      skipFirstKey
      title="Your custom Title"
      className="YourCustomClasses"
      possibleRows={[1, 2, 3, 5]}
    />
  );
};

export default App;
