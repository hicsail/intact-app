import "./App.css";
import { createHashRouter, RouterProvider } from "react-router-dom";
import { TestPage } from "./pages/TestPage";
import { AuthPage } from "./pages/AuthPage";

function App() {
  const router = createHashRouter([
    { path: "assessments/:participantId", element: <TestPage /> },
    { path: "assessments", element: <TestPage /> },
    { path: "/:participantId", element: <AuthPage /> },
    { path: "/", element: <AuthPage /> },
  ]);

  const setDynamicHeight = () => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  };

  setDynamicHeight();
  window.addEventListener("resize", setDynamicHeight);

  return <RouterProvider router={router} />;
}

export default App;
