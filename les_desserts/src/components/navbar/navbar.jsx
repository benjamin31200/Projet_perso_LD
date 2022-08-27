import React from "react";
import { Section, Nav, Div } from "./StyledComponentNavbar.jsx";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { chalkFunc } from "../../Function.js";

const Navbar = () => {
  const [onSession, setOnSession] = useState(Boolean);
  const [getSession, setGetSession] = useState([]);

  useEffect(() => {
    function getSess() {
      axios
        .get("/home")
        .then((result) => {
          chalkFunc.log(chalkFunc.success("Requête réussie"));
          setGetSession(result);
        })
        .catch((err) => {
          console.error(err);
        });
    }
    if (getSession.length === 0) {
      getSess();
    } else if (getSession.length === undefined) {
      console.log(getSession);
      if (getSession.data !== false && getSession.data !== null) {
        setOnSession(true);
      } else {
        setOnSession(false);
      }
    }
  }, [getSession]);

  console.log(onSession);
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
