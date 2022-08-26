import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App.jsx";
import reportWebVitals from "./reportWebVitals.js";
import HomeLogin from "./components/users/login/homeLogin.jsx"
import HomeSignUp from "./components/users/signUp/homeSignUp.jsx";
import Logout  from "./components/users/logout/logout.jsx";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route exact path="/" element={<App />} />
      <Route exact path="/inscription" element={<HomeSignUp />} />
      <Route exact path="/connexion" element={<HomeLogin />} />
      <Route exact path="/logout" element={<Logout />} />
    </Routes>
  </BrowserRouter>
);

reportWebVitals();
