import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App.jsx";
import reportWebVitals from "./reportWebVitals.js";
import Connexion from "./components/users/login/login.jsx";
import HomeSignIn from "./components/users/signIn/homeSignIn.jsx";
import SignIn from "./components/users/signIn/signIn.jsx";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="inscription" element={<HomeSignIn />}>
          <Route path="new" element={<SignIn />} />
        </Route>
        <Route path="connexion" element={<Connexion />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

reportWebVitals();
