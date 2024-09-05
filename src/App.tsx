import "./App.css";
import { createHashRouter, RouterProvider } from "react-router-dom";
import { TestPage } from "./pages/TestPage";
import { AuthPage } from "./pages/AuthPage";

function App() {
  const router = createHashRouter([
    { path: "assessments/:participantId", element: <TestPage /> },
    { path: "assessments", element: <TestPage /> },
    { path: "auth/:participantId", element: <AuthPage /> },
    { path: "auth/", element: <AuthPage /> },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
