import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App.jsx";
import reportWebVitals from "./reportWebVitals.js";
import Inscription from "./components/inscription/inscription.jsx";
import Connexion from "./components/connexion/connexion.jsx";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="inscription" element={<Inscription />} />
        <Route path="connexion" element={<Connexion />} />
        {/* <Route}
        index
        element={<IndexInvoices />}
      /> */}
        {/* <Route path=":invoiceId" element={<Invoice />} /> */}
      </Route>
      {/* <Route
          path="*"
          element={<Error />}
        />
      </Route> */}
    </Routes>
  </BrowserRouter>
);

reportWebVitals();
