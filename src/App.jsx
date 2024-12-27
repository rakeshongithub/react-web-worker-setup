import "./App.css";
import { DataGridComponent } from "./components/DataGridComponent";

function App() {
  return (
    <>
      <div className="container mt-5">
        <h1 className="text-4xl font-bold text-center mb-6">
          React + Web Worker Setup
        </h1>
        <DataGridComponent />
      </div>
    </>
  );
}

export default App;
