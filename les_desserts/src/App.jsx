import React from "react";
import { Main, Section } from "./styledComponentApp.jsx";
import Navbar from "./components/navbar/navbar.jsx";
import Header from "./components/header/header.jsx";
import RecipeCard from "./components/Card/Card.jsx";

function App() {
  return (
    <Main>
      <Navbar />
      <Section>
        <Header />
        <RecipeCard />
        <form action="/inscription" method="post">
          <input
            type="text"
            id="name"
            class="swal2-input"
            placeholder="Prénom"
          />
          <input
            type="text"
            id="lastname"
            class="swal2-input"
            placeholder="Nom"
          />
          <input
            type="text"
            id="pseudonyme"
            class="swal2-input"
            placeholder="Pseudonyme"
          />
          <input
            type="email"
            id="email"
            class="swal2-input"
            placeholder="Email"
          />
          <input
            type="password"
            id="password"
            class="swal2-input"
            placeholder="mot de passe"
          />
          <input
            type="password"
            id="repeat_password"
            class="swal2-input"
            placeholder="répéter le mot de passe"
          />
          <input
            type="submit"
            id="submit"
            class="swal2-input"
            placeholder="envoyer"
          />
        </form>
      </Section>
    </Main>
  );
}

export default App;
