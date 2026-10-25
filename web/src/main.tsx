import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { CountyProvider } from "./lib/county";
import "./styles.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <CountyProvider>
        <App />
      </CountyProvider>
    </BrowserRouter>
  </StrictMode>,
);
