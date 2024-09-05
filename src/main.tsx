import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { GeneralProvider } from "./contexts/general.context.tsx";
import { TestProvider } from "./contexts/test.context.tsx";
import { AuthProvider } from "./contexts/auth.context.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <GeneralProvider>
        <TestProvider>
          <App />
        </TestProvider>
      </GeneralProvider>
    </AuthProvider>
  </React.StrictMode>
);
