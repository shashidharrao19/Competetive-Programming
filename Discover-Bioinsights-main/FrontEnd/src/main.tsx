import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { AuthProvider } from "./context/AuthContext.jsx";
import { PatientProvider } from './context/PatientContext';


createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <PatientProvider>
        <App />
      </PatientProvider>
    </AuthProvider>
  </StrictMode>
);
