import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { TestPage } from "./pages/TestPage";

function App() {
  const router = createBrowserRouter([{ path: "assessments", element: <TestPage /> }]);

  return <RouterProvider router={router} />;
}

export default App;
