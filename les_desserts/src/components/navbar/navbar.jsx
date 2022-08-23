import React from "react";
import { Section, Nav, Div } from "./StyledComponentNavbar.jsx";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <Section>
      <Nav>
        <Div>
          <Link to="/">Accueil</Link>
        </Div>
        <Div>
          <Link to="/desserts">Les desserts</Link>
        </Div>
        <Div>
          <Link to="/inscription">Inscription</Link>
        </Div>
        <Div>
          <Link to="/connexion">Connection</Link>
        </Div>
      </Nav>
    </Section>
  );
};

export default Navbar;
