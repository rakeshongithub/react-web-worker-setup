// src/hooks/useDataWorker.js
import { useEffect, useState } from "react";

export const useDataWorker = (dataApi) => {
  const [rowData, setRowData] = useState([]);
  const [columnDefs, setColumnDefs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Initialize the Web Worker with the specified script file
    const worker = new Worker(
      new URL("../workers/dataProcessorWorker.js", import.meta.url)
    );

    // Handle messages received from the worker, including success and error handling
    worker.onmessage = (event) => {
      const { status, processedData, columns, message } = event.data;
      if (status === "success") {
        console.log("Worker received dataApi:", processedData, columns);
        setRowData(processedData);
        setColumnDefs(
          columns.map((col) => ({ field: col.key, headerName: col.name }))
        );
        setLoading(false);
      } else if (status === "error") {
        console.error("Worker error:", message);
        setLoading(false);
      }
    };

    // Handle errors from the worker
    worker.onerror = (error) => {
      console.error("Worker error:", error);
      setLoading(false);
    };

    // Send API URLs to the worker
    worker.postMessage({ dataApi });

    // Cleanup the worker when the component unmounts
    return () => worker.terminate();
  }, [dataApi]);

  return { rowData, columnDefs, loading };
};
