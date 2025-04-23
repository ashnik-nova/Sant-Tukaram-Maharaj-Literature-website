import React from "react";
import  { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import UserContextProvider from "./context/User/UserContextProvider.jsx";
import ToastContextProvider from "./context/Toast/ToastContextProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ToastContextProvider>
      <UserContextProvider>
        <App />
      </UserContextProvider>
    </ToastContextProvider>
  </StrictMode>
);
