import { EMPLOYEES } from "./data/testData";
import Table from "./components/Table";

function App() {
  return (
    <div className="App">
      <Table data={EMPLOYEES} skipFirstKey />
    </div>
  );
}

export default App;
