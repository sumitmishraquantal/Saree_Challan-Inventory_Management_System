import React from "react";

import ReactDOM from "react-dom/client";

import {
  BrowserRouter
} from "react-router-dom";

import {
  Toaster
} from "react-hot-toast";

import App from "./App";

import "./index.css";

import {
  AuthProvider
} from "./auth/AuthContext";


ReactDOM.createRoot(
  document.getElementById("root")!
).render(

  <React.StrictMode>

    <BrowserRouter>

      <AuthProvider>

        <Toaster />

        <App />

      </AuthProvider>

    </BrowserRouter>

  </React.StrictMode>
);