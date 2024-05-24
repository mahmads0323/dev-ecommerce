import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ContextProvider } from "./components/context/cartContext.tsx";
import { AuthContextProvider } from "./components/context/userContext.tsx";
import { CookiesProvider } from "react-cookie";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ContextProvider>
        <AuthContextProvider>
          <CookiesProvider defaultSetOptions={{ path: "/" }}>
            <App />
          </CookiesProvider>
        </AuthContextProvider>
      </ContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
