import "./App.css";
import { HashRouter, Route, Routes } from "react-router-dom";
import { TestPage } from "./pages/TestPage";
import { AuthPage } from "./pages/AuthPage";
import { LoadingPage } from "./pages/LoadingPage";

function App() {
  const setDynamicHeight = () => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  };

  setDynamicHeight();
  window.addEventListener("resize", setDynamicHeight);

  return (
    <HashRouter>
      <Routes>
        <Route path="/:studyId?" element={<LoadingPage />} />
        <Route path="auth/:studyId?" element={<AuthPage />} />
        <Route path="/assessments" element={<TestPage />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
