import "./App.css";
import CustomTable from "./components/CustomTable";
import SearchBox from "./components/SearchBox";
import "./styles/main.scss";

function App() {
  return (
    <div className="mainContainer">
      <SearchBox />
      <CustomTable />
    </div>
  );
}

export default App;
