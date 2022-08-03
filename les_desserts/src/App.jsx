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
      </Section>
      <form action="/" method="post" className="form">
        <button type="submit">Connected?</button>
      </form>
    </Main>
  );
}

export default App;
