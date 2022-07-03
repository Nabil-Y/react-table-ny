import { EMPLOYEES } from "./data/testData";
import Table from "./components/Table";

const App = () => {
  return <Table data={EMPLOYEES} skipFirstKey title="Employees" />;
};

export default App;
