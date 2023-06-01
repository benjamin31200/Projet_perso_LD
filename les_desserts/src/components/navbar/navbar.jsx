import React from "react";
import { Section, Nav, Div } from "./StyledComponentNavbar.jsx";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { chalkFunc } from "../../Function.js";

const Navbar = () => {
  const [onSession, setOnSession] = useState(Boolean);

  useEffect(() => {
      axios
        .get("/home")
        .then((result) => {
          chalkFunc.log(chalkFunc.success("Session réussie"));
          console.log(result.data);
          if (result.data === null) {
            setOnSession(false);
          } else {
            setOnSession(true);
          }
        })
        .catch((err) => {
          chalkFunc.error(chalkFunc.bad("Session non réussie"));
          console.error(err);
        });
  });
  return (
    <Section>
      <Nav>
        {onSession ? (
          <>
            <Div>
              <Link to="/">Accueil</Link>
            </Div>
            <Div>
              <Link to="/desserts">Les desserts</Link>
            </Div>
            <Div>
              <Link to="/logout">Déconnection</Link>
            </Div>
          </>
        ) : (
          <>
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
          </>
        )}
      </Nav>
    </Section>
  );
};

export default Navbar;
