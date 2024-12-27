// src/components/DataGridComponent.jsx
import { AgGridReact } from "ag-grid-react";
import { useDataWorker } from "../hooks/useDataWorker";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";

ModuleRegistry.registerModules([AllCommunityModule]);

export const DataGridComponent = () => {
  // Call the useDataWorker hook to fetch and process data
  const { rowData, columnDefs, loading } = useDataWorker(
    "https://jsonplaceholder.typicode.com/todos"
  );

  const defaultColDef = {
    flex: 1,
  };

  return (
    <div className="ag-theme-alpine" style={{ height: 600, width: "100%" }}>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div style={{ width: "100%", height: "100%" }}>
          <AgGridReact
            columnDefs={columnDefs}
            rowData={rowData}
            defaultColDef={defaultColDef}
            theme={"ag-theme-alpine"}
          />
        </div>
      )}
    </div>
  );
};
