import logo from "./logo.svg";
import "./App.css";
import ResponsiveDrawer from "./Drawer";
import VerticalTabs from "./Drawer";
import DenseAppBar from "./AppBar";

function App() {
  return (
    <div className="App">
      <DenseAppBar />
      <VerticalTabs />
    </div>
  );
}

export default App;
