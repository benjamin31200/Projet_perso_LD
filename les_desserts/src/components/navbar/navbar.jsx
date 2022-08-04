import React from "react";
import { Section, Nav, Div } from "./StyledComponentNavbar.jsx";
import { Outlet, Link } from "react-router-dom";

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
          <Link to="/connexion">Connexion</Link>
        </Div>
      </Nav>
      <Outlet />
    </Section>
  );
};

export default Navbar;
