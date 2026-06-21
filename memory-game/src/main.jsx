import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App.jsx";

import "./styles/global.css";
import "./styles/themes.css";
import "./styles/components.css";
import "./styles/animations.css";
import "./styles/accessibility.css";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root element not found. Make sure index.html contains <div id='root'></div>.");
}

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>
);