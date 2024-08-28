import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { TestPage } from "./pages/TestPage";
import { TransitionPage } from "./pages/TransitionPage";

function App() {
  const router = createBrowserRouter([
    { path: "assessments", element: <TestPage /> },
    { path: "transition", element: <TransitionPage /> },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
