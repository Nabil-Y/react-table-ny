import { EMPLOYEES } from "./data/testData";
import Table from "./components/Table";

const App = () => {
  return (
    <Table
      data={EMPLOYEES}
      skipFirstKey
      title="Your custom Title"
      className="YourCustomClasses"
      possibleRows={[1, 3, 4, 5]}
    />
  );
};

export default App;
