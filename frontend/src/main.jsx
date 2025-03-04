import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import axios from "axios";
import { GlobalProvider } from "../contexts/GlobalContext";

axios.defaults.baseURL = import.meta.env.VITE_API_URL || "http://localhost:3000";

const rootElement = document.getElementById("root");
if (rootElement && !rootElement.hasAttribute("data-react-root")) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <BrowserRouter>
        <GlobalProvider>
          <App />
        </GlobalProvider>
      </BrowserRouter>
    </React.StrictMode>
  );
  rootElement.setAttribute("data-react-root", "true"); // Marca como inicializado
}