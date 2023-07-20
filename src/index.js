import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "antd";
import UserAuthProvider from "./contexts/userAuthContext";

import { BrowserRouter } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <UserAuthProvider>
      <App />
    </UserAuthProvider>
  </BrowserRouter>
);
