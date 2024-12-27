// src/workers/dataProcessorWorker.js
const columns = [
  { key: "userId", name: "User ID" },
  { key: "id", name: "ID" },
  { key: "title", name: "Title" },
  { key: "completed", name: "Completed" },
];

// Listen for messages from the main thread
self.onmessage = async (event) => {
  try {
    const { dataApi } = event.data;
    // Fetch column definitions
    const todosResponse = await fetch(dataApi);
    const todos = await todosResponse.json();

    // Simulate heavy processing logic
    const transformedData = transformData(todos);

    self.postMessage({
      status: "success",
      processedData: transformedData,
      columns,
    });
  } catch (error) {
    self.postMessage({ status: "error", message: error.message });
  }
};

// Transform the data to match the column definitions
function transformData(data) {
  return data.map((row) => {
    const mappedRow = {};
    columns.forEach((column) => {
      mappedRow[column.key] = row[column.key];
    });
    return mappedRow;
  });
}
